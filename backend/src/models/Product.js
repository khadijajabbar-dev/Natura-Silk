import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    price: { type: Number, required: true },
    comparePrice: { type: Number, default: null },
    shortDesc: { type: String, default: '' },
    description: { type: String, default: '' },
    ingredients: { type: String, default: '' },
    howToUse: { type: String, default: '' },
    image: { type: String, default: null },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    stock: { type: Number, default: 100 },
    isBestseller: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

export default mongoose.model('Product', productSchema);
