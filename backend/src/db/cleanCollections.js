import 'dotenv/config';
import readline from 'readline';
import { connectDB } from './index.js';
import mongoose from 'mongoose';

const KNOWN_COLLECTIONS = [
  'users', 'categories', 'products', 'reviews',
  'cartitems', 'orders', 'settings', 'contactmessages',
];

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (answer) => { rl.close(); resolve(answer); }));
}

await connectDB();

const collections = await mongoose.connection.db.listCollections().toArray();
const unused = collections.filter((c) => !KNOWN_COLLECTIONS.includes(c.name));

if (unused.length === 0) {
  console.log('\nNo unused collections found — nothing to clean up.\n');
  process.exit(0);
}

console.log('\nThe following collections are not used by any current model:\n');
for (const c of unused) {
  const count = await mongoose.connection.db.collection(c.name).countDocuments();
  console.log(`  - ${c.name}  (${count} documents)`);
}

const answer = await ask('\nDrop ALL of the above collections? This cannot be undone. Type "yes" to confirm: ');

if (answer.trim().toLowerCase() !== 'yes') {
  console.log('Cancelled — nothing was deleted.\n');
  process.exit(0);
}

for (const c of unused) {
  await mongoose.connection.db.collection(c.name).drop();
  console.log(`Dropped: ${c.name}`);
}

console.log('\nDone.\n');
process.exit(0);
