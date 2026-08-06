import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import Product from './src/models/Product.js';

const publicImagesDir = path.join(process.cwd(), 'public', 'images');

const createSvgPlaceholder = (text) => `
<svg width="600" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#E8DFCC" />
  <text x="50%" y="50%" font-family="sans-serif" font-size="36" fill="#3F4A2E" text-anchor="middle" dominant-baseline="middle">
    ${text}
  </text>
  <text x="50%" y="55%" font-family="sans-serif" font-size="20" fill="#647846" text-anchor="middle" dominant-baseline="middle">
    Image not found
  </text>
</svg>
`;

async function fixImages() {
  await mongoose.connect('mongodb://127.0.0.1:27017/haircare');
  const products = await Product.find({});
  
  for (let p of products) {
    if (!p.image) continue;
    
    // Convert /images/foo.jpg to absolute path
    const localPath = path.join(process.cwd(), 'public', p.image.replace(/^\//, ''));
    
    if (!fs.existsSync(localPath)) {
      console.log(`Missing image for ${p.name}: ${p.image}`);
      
      // We will create an SVG file instead
      const newFileName = path.basename(p.image, path.extname(p.image)) + '-placeholder.svg';
      const newLocalPath = path.join(publicImagesDir, newFileName);
      
      fs.writeFileSync(newLocalPath, createSvgPlaceholder(p.name));
      
      p.image = `/images/${newFileName}`;
      await p.save();
      console.log(` -> Replaced with placeholder: ${p.image}`);
    }
  }
  
  console.log('All missing images replaced with placeholders!');
  await mongoose.disconnect();
}

fixImages();
