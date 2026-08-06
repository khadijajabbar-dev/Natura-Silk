// // import 'dotenv/config';
// // import express from 'express';
// // import cors from 'cors';
// // import path from 'path';
// // import { fileURLToPath } from 'url';
// // import { connectDB } from './db/index.js';
// // import { seedDatabase } from './db/seedData.js';
// // import Category from './models/Category.js';
// // import Product from './models/Product.js';

// // import productRoutes from './routes/productRoutes.js';
// // import cartRoutes from './routes/cartRoutes.js';
// // import orderRoutes from './routes/orderRoutes.js';
// // import settingsRoutes from './routes/settingsRoutes.js';
// // import adminRoutes from './routes/adminRoutes.js';
// // import contactRoutes from './routes/contactRoutes.js';
// // import blogRoutes from './routes/blogRoutes.js';
// // import reviewRoutes from './routes/reviewRoutes.js';

// // const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // const app = express();
// // const PORT = process.env.PORT || 4000;

// // app.use(cors());
// // app.use(express.json());
// // app.use('/images', express.static(path.join(__dirname, '../public/images')));

// // app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// // app.use('/api/products', productRoutes);
// // app.use('/api/cart', cartRoutes);
// // app.use('/api/orders', orderRoutes);
// // app.use('/api/settings', settingsRoutes);
// // app.use('/api/admin', adminRoutes);
// // app.use('/api/contact', contactRoutes);
// // app.use('/api/blogs', blogRoutes);
// // app.use('/api/reviews', reviewRoutes);

// // app.use((req, res) => {
// //   res.status(404).json({ error: 'Route not found.' });
// // });

// // app.use((err, _req, res, _next) => {
// //   console.error(err);
// //   res.status(500).json({ error: 'Something went wrong on our end.' });
// // });

// // async function start() {
// //   try {
// //     await connectDB();
// //   } catch (err) {
// //     console.error('❌ Could not connect to MongoDB:', err.message);
// //     console.error('   Make sure MONGODB_URI is set correctly in your .env file.');
// //     console.error('   For MongoDB Atlas: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/haircare');
// //     process.exit(1);
// //   }

// //   // Auto-seed has been disabled per user request.
// //   try {
// //     const [categoryCount, productCount] = await Promise.all([
// //       Category.countDocuments(),
// //       Product.countDocuments(),
// //     ]);
// //     console.log(`✅ Found existing data (${productCount} products, ${categoryCount} categories).`);
// //   } catch (err) {
// //     console.error('⚠️  Database check failed (the site will still run):', err.message);
// //   }

// //   app.listen(PORT, () => {
// //     console.log(`🌿 HairCare API running on http://localhost:${PORT}`);
// //   });
// // }

// // start();



// import 'dotenv/config';
// import { connectDB } from './index.js';
// import { seedDatabase } from './seedData.js';
// import Category from '../models/Category.js';
// import Product from '../models/Product.js';

// const FORCE = process.argv.includes('--force');

// await connectDB();

// const [categoryCount, productCount] = await Promise.all([
//   Category.countDocuments(),
//   Product.countDocuments(),
// ]);

// if ((categoryCount > 0 || productCount > 0) && !FORCE) {
//   console.log('\n⚠️  Refusing to seed: this database already has real data');
//   console.log(`   (${categoryCount} categories, ${productCount} products).`);
//   console.log('   Seeding upserts demo data by slug, which would overwrite');
//   console.log('   any of your products/categories that share a slug with the');
//   console.log('   demo data.\n');
//   console.log('   If you really want to seed anyway, run:');
//   console.log('     npm run seed -- --force\n');
//   process.exit(1);
// }

// const counts = await seedDatabase();
// console.log('Seed complete:', counts);
// process.exit(0);



import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './db/index.js';

import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on our end.' });
});

async function start() {
  try {
    await connectDB();
  } catch (err) {
    console.error('❌ Could not connect to MongoDB:', err.message);
    console.error('   Make sure MongoDB is installed and running on your machine (see README), then try again.');
    process.exit(1);
  }

  // NOTE: this server intentionally does NOT auto-seed on startup.
  // Seeding is a destructive, explicit action now — run `npm run seed`
  // yourself if you actually want the demo data. See db/seed.js for the
  // safety check that protects any real data you already have.

  app.listen(PORT, () => {
    console.log(`HairCare API running on http://localhost:${PORT}`);
  });
}

start();
