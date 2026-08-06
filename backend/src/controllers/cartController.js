import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';
import { serializeCartItem } from '../utils/serializers.js';

async function getCartWithProducts(guestId) {
  const items = await CartItem.find({ guestId }).populate('product').sort({ created_at: -1 });
  // A product may have been deleted after being added to someone's cart — skip those.
  return items.filter((i) => i.product);
}

function calcSubtotal(items) {
  return items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
}

export async function getCart(req, res) {
  const items = await getCartWithProducts(req.guestId);
  res.json({ items: items.map(serializeCartItem), subtotal: calcSubtotal(items) });
}

export async function addToCart(req, res) {
  const { product_id, quantity = 1 } = req.body;
  if (!product_id) return res.status(400).json({ error: 'Missing product.' });

  const product = await Product.findById(product_id);
  if (!product) return res.status(404).json({ error: 'Product not found.' });

  const existing = await CartItem.findOne({ guestId: req.guestId, product: product_id });
  if (existing) {
    existing.quantity += quantity;
    await existing.save();
  } else {
    await CartItem.create({ guestId: req.guestId, product: product_id, quantity });
  }

  const items = await getCartWithProducts(req.guestId);
  res.status(201).json({ items: items.map(serializeCartItem), subtotal: calcSubtotal(items) });
}

export async function updateCartItem(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  const item = await CartItem.findOne({ _id: id, guestId: req.guestId });
  if (!item) return res.status(404).json({ error: 'Cart item not found.' });

  if (quantity <= 0) {
    await CartItem.deleteOne({ _id: id });
  } else {
    item.quantity = quantity;
    await item.save();
  }

  const items = await getCartWithProducts(req.guestId);
  res.json({ items: items.map(serializeCartItem), subtotal: calcSubtotal(items) });
}

export async function removeCartItem(req, res) {
  const { id } = req.params;
  await CartItem.deleteOne({ _id: id, guestId: req.guestId });
  const items = await getCartWithProducts(req.guestId);
  res.json({ items: items.map(serializeCartItem), subtotal: calcSubtotal(items) });
}
