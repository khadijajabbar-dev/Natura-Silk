import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    guestId: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

cartItemSchema.index({ guestId: 1, product: 1 }, { unique: true });

export default mongoose.model('CartItem', cartItemSchema);
