import mongoose from 'mongoose';

// Set MONGODB_URI in your environment to point at MongoDB Atlas or a remote
// server. By default this connects to a local MongoDB server — the same one
// you see in MongoDB Compass under "localhost".
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/haircare';

export async function connectDB() {
  mongoose.connection.on('connected', () => {
    console.log(`✅ Database connected: ${MONGODB_URI}`);
  });
  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

  await mongoose.connect(MONGODB_URI);
}

export default mongoose;
