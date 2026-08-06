// import 'dotenv/config';
// import { connectDB } from './index.js';
// import { seedDatabase } from './seedData.js';

// await connectDB();
// const counts = await seedDatabase();
// console.log('Seed complete:', counts);
// process.exit(0);



import 'dotenv/config';
import { connectDB } from './index.js';
import { seedDatabase } from './seedData.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

const FORCE = process.argv.includes('--force');

await connectDB();

const [categoryCount, productCount] = await Promise.all([
  Category.countDocuments(),
  Product.countDocuments(),
]);

if ((categoryCount > 0 || productCount > 0) && !FORCE) {
  console.log('\n⚠️  Refusing to seed: this database already has real data');
  console.log(`   (${categoryCount} categories, ${productCount} products).`);
  console.log('   Seeding upserts demo data by slug, which would overwrite');
  console.log('   any of your products/categories that share a slug with the');
  console.log('   demo data.\n');
  console.log('   If you really want to seed anyway, run:');
  console.log('     npm run seed -- --force\n');
  process.exit(1);
}

const counts = await seedDatabase();
console.log('Seed complete:', counts);
process.exit(0);
