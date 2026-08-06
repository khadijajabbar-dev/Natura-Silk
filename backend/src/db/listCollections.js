import 'dotenv/config';
import { connectDB } from './index.js';
import mongoose from 'mongoose';

// Every collection our models actually use (Mongoose lowercases + pluralizes
// model names by default, e.g. User -> users, CartItem -> cartitems).
const KNOWN_COLLECTIONS = [
  'users', 'categories', 'products', 'reviews',
  'cartitems', 'orders', 'settings', 'contactmessages',
];

await connectDB();

const collections = await mongoose.connection.db.listCollections().toArray();

console.log('\nCollections in this database:\n');
for (const c of collections) {
  const count = await mongoose.connection.db.collection(c.name).countDocuments();
  const known = KNOWN_COLLECTIONS.includes(c.name);
  console.log(`  ${known ? '✅' : '⚠️ UNUSED'}  ${c.name}  (${count} documents)`);
}

const unused = collections.filter((c) => !KNOWN_COLLECTIONS.includes(c.name));
if (unused.length === 0) {
  console.log('\nNo unused collections found — the database is clean.\n');
} else {
  console.log(`\n${unused.length} collection(s) above are not used by any current model.`);
  console.log('If you no longer need them, drop them from MongoDB Compass (right-click → Drop Collection),');
  console.log('or run: npm run db:clean   (this will delete them for you after asking to confirm)\n');
}

process.exit(0);
