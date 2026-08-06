import mongoose from 'mongoose';

// A single document holds all editable site settings. Using Mixed keeps
// this flexible so new fields can be added later without a migration.
const settingsSchema = new mongoose.Schema(
  {
    singleton: { type: String, default: 'main', unique: true },
    values: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: { createdAt: false, updatedAt: 'updated_at' } }
);

export default mongoose.model('Settings', settingsSchema);
