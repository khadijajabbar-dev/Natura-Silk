import mongoose from 'mongoose';
import Product from './src/models/Product.js';

async function check() {
  await mongoose.connect('mongodb://127.0.0.1:27017/haircare');
  const products = await Product.find({});
  console.log('Products in DB (127.0.0.1):');
  products.forEach(p => console.log(`- ${p.name} (slug: ${p.slug})`));
  await mongoose.disconnect();
}
check();
