import mongoose from 'mongoose';

const contentBlockSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['p', 'h', 'img'], required: true },
    text: { type: String, default: '' },
    src: { type: String, default: '' },
    caption: { type: String, default: '' },
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tag: { type: String, default: '' },
    excerpt: { type: String, default: '' },
    image: { type: String, default: '' },
    date: { type: String, default: '' },
    content: { type: [contentBlockSchema], default: [] },
    published: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default mongoose.model('Blog', blogSchema);
