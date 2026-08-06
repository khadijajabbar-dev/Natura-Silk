
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    guestId: { type: String, required: true },
    status: { type: String, default: 'placed' },
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true },
    shippingName: { type: String },
    shippingEmail: { type: String },
    shippingPhone: { type: String },
    shippingAddress: { type: String },
    shippingCity: { type: String },
    paymentMethod: { type: String, default: 'cod' },
    items: [orderItemSchema],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

export default mongoose.model('Order', orderSchema);
