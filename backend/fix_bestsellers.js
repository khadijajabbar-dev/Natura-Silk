import mongoose from 'mongoose';
import Product from './src/models/Product.js';

async function updateAll() {
  await mongoose.connect('mongodb://127.0.0.1:27017/haircare');
  await Product.updateMany({}, { isBestseller: true });
  console.log('Set isBestseller=true for all products.');
  await mongoose.disconnect();
}
updateAll();
