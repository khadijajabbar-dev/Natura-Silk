import CartItem from '../models/CartItem.js';
import Order from '../models/Order.js';
import { serializeOrder, serializeOrderItem } from '../utils/serializers.js';
import { sendOrderConfirmationEmail } from '../utils/mailer.js';

const FREE_SHIPPING_THRESHOLD = 2000;
const SHIPPING_FEE = 200;

export async function checkout(req, res) {
  const { shipping_name, shipping_email, shipping_phone, shipping_address, shipping_city, payment_method } = req.body;

  if (!shipping_name || !shipping_email || !shipping_phone || !shipping_address || !shipping_city) {
    return res.status(400).json({ error: 'Please fill in all shipping details.' });
  }

  if (!/^\S+@\S+\.\S+$/.test(shipping_email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const cartItems = await CartItem.find({ guestId: req.guestId }).populate('product');
  const validItems = cartItems.filter((i) => i.product);

  if (validItems.length === 0) {
    return res.status(400).json({ error: 'Your cart is empty.' });
  }

  const subtotal = validItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const order = await Order.create({
    guestId: req.guestId,
    subtotal,
    shipping,
    total,
    shippingName: shipping_name,
    shippingEmail: shipping_email,
    shippingPhone: shipping_phone,
    shippingAddress: shipping_address,
    shippingCity: shipping_city,
    paymentMethod: payment_method || 'cod',
    items: validItems.map((i) => ({
      product: i.product._id,
      productName: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
    })),
  });

  await CartItem.deleteMany({ guestId: req.guestId });

  const serializedOrder = serializeOrder(order);
  const serializedItems = order.items.map(serializeOrderItem);

  // Best-effort — a slow/failed email should never block the order itself.
  sendOrderConfirmationEmail({ to: shipping_email, order: serializedOrder, items: serializedItems })
    .catch((err) => console.error('Order confirmation email error:', err.message));

  res.status(201).json({ order: serializedOrder, items: serializedItems });
}

export async function listOrders(req, res) {
  const orders = await Order.find({ guestId: req.guestId }).sort({ created_at: -1 });
  const withItems = orders.map((o) => ({
    ...serializeOrder(o),
    items: o.items.map(serializeOrderItem),
  }));
  res.json({ orders: withItems });
}

export async function getOrder(req, res) {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id, guestId: req.guestId });
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  res.json({ order: serializeOrder(order), items: order.items.map(serializeOrderItem) });
}

const CANCELLABLE_STATUSES = ['placed', 'processing'];

export async function cancelOrder(req, res) {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id, guestId: req.guestId });
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  if (!CANCELLABLE_STATUSES.includes(order.status)) {
    return res.status(400).json({
      error: order.status === 'cancelled'
        ? 'This order is already cancelled.'
        : 'This order has already been dispatched and can no longer be cancelled. Please contact us for help.',
    });
  }

  order.status = 'cancelled';
  await order.save();
  res.json({ order: serializeOrder(order), items: order.items.map(serializeOrderItem) });
}
