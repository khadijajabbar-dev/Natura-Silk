import mongoose from 'mongoose';
import Product from './src/models/Product.js';

async function check() {
  await mongoose.connect('mongodb://127.0.0.1:27017/haircare');
  const products = await Product.find({});
  console.log('Products and their isBestseller status:');
  products.forEach(p => console.log(`- ${p.name}: isBestseller=${p.isBestseller}`));
  await mongoose.disconnect();
}
check();
