import mongoose from 'mongoose';
import Product from './src/models/Product.js';
import Category from './models/Category.js';
import Review from './models/Review.js';
import Blog from './models/Blog.js';

async function clearDb() {
  await mongoose.connect('mongodb://127.0.0.1:27017/haircare');
  
  await Product.deleteMany({});
  await Category.deleteMany({});
  await Review.deleteMany({});
  await Blog.deleteMany({});
  
  console.log('Database cleared! All seeded data has been removed.');
  process.exit(0);
}

clearDb();
