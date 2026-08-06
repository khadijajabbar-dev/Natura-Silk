import Settings from '../models/Settings.js';
import { DEFAULT_SETTINGS } from '../data/defaultSettings.js';

// If the site was ever loaded before, a Settings doc may already exist in
// Mongo with the *old* default copy baked in (e.g. "Why Choose HairCare?"),
// which would otherwise silently override the new defaults above forever.
// Auto-heal any value that still exactly matches a known previous default —
// this never touches a value the shop owner actually customised themselves.
const LEGACY_DEFAULTS = {
  whyChooseEyebrow: 'Why Choose HairCare?',
  promoSubtext: 'On Selected Products',
};

export async function getSettings(_req, res) {
  let doc = await Settings.findOne({ singleton: 'main' });
  if (!doc) {
    doc = await Settings.create({ singleton: 'main', values: DEFAULT_SETTINGS });
  }

  let changed = false;
  for (const [key, legacyValue] of Object.entries(LEGACY_DEFAULTS)) {
    if (doc.values?.[key] === legacyValue && DEFAULT_SETTINGS[key] !== legacyValue) {
      doc.values[key] = DEFAULT_SETTINGS[key];
      changed = true;
    }
  }
  if (changed) {
    doc.markModified('values');
    await doc.save();
  }

  // Merge with defaults so newly-added fields always have a fallback value.
  res.json({ settings: { ...DEFAULT_SETTINGS, ...doc.values } });
}
