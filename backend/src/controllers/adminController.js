// // import fs from 'fs';
// // import path from 'path';
// // import { fileURLToPath } from 'url';
// // import Settings from '../models/Settings.js';
// // import Product from '../models/Product.js';
// // import Category from '../models/Category.js';
// // import Order from '../models/Order.js';
// // import { DEFAULT_SETTINGS, SETTINGS_FIELDS, SETTINGS_GROUPS } from '../data/defaultSettings.js';
// // import { signToken } from '../utils/jwt.js';
// // import { serializeProduct, serializeCategory, serializeOrder, serializeOrderItem } from '../utils/serializers.js';

// // export const ORDER_STATUSES = ['placed', 'processing', 'dispatched', 'delivered', 'cancelled'];

// // const __dirname = path.dirname(fileURLToPath(import.meta.url));
// // const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

// // export async function adminListImages(_req, res) {
// //   const imagesDir = path.join(__dirname, '../../public/images');
// //   let files = [];
// //   try {
// //     files = collectImageFiles(imagesDir);
// //   } catch {
// //     files = [];
// //   }
// //   res.json({ images: files.sort() });
// // }

// // function collectImageFiles(dir, prefix = '/images') {
// //   let results = [];
// //   const entries = fs.readdirSync(dir, { withFileTypes: true });
// //   for (const entry of entries) {
// //     if (entry.isDirectory()) {
// //       results = results.concat(collectImageFiles(path.join(dir, entry.name), `${prefix}/${entry.name}`));
// //     } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
// //       results.push(`${prefix}/${entry.name}`);
// //     }
// //   }
// //   return results;
// // }

// // export async function adminUploadImage(req, res) {
// //   if (!req.file) {
// //     return res.status(400).json({ error: 'No image file was received.' });
// //   }
// //   res.status(201).json({ path: `/images/uploads/${req.file.filename}` });
// // }

// // const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'haircare2026';

// // export async function adminLogin(req, res) {
// //   const { password } = req.body;
// //   if (!password || password !== ADMIN_PASSWORD) {
// //     return res.status(401).json({ error: 'Incorrect admin password.' });
// //   }
// //   const token = signToken({ role: 'admin' });
// //   res.json({ token });
// // }

// // export async function getAdminSettings(_req, res) {
// //   let doc = await Settings.findOne({ singleton: 'main' });
// //   if (!doc) {
// //     doc = await Settings.create({ singleton: 'main', values: DEFAULT_SETTINGS });
// //   }
// //   res.json({
// //     settings: { ...DEFAULT_SETTINGS, ...doc.values },
// //     fields: SETTINGS_FIELDS,
// //     groups: SETTINGS_GROUPS,
// //   });
// // }

// // export async function updateAdminSettings(req, res) {
// //   const updates = req.body || {};
// //   let doc = await Settings.findOne({ singleton: 'main' });
// //   if (!doc) {
// //     doc = await Settings.create({ singleton: 'main', values: { ...DEFAULT_SETTINGS, ...updates } });
// //   } else {
// //     doc.values = { ...DEFAULT_SETTINGS, ...doc.values, ...updates };
// //     await doc.save();
// //   }
// //   res.json({ settings: doc.values });
// // }

// // function slugify(name) {
// //   return name
// //     .toLowerCase()
// //     .trim()
// //     .replace(/[^a-z0-9]+/g, '-')
// //     .replace(/(^-|-$)/g, '');
// // }

// // export async function adminListProducts(_req, res) {
// //   const products = await Product.find().populate('category').sort({ _id: -1 });
// //   res.json({ products: products.map(serializeProduct) });
// // }

// // export async function adminCreateProduct(req, res) {
// //   const { name, price, category_slug, short_desc, description, image, is_bestseller } = req.body;
// //   if (!name || !price) return res.status(400).json({ error: 'Name and price are required.' });

// //   let categoryId = null;
// //   if (category_slug) {
// //     const cat = await Category.findOne({ slug: category_slug });
// //     categoryId = cat ? cat._id : null;
// //   }

// //   let slug = slugify(name);
// //   let suffix = 1;
// //   while (await Product.findOne({ slug })) {
// //     slug = `${slugify(name)}-${suffix++}`;
// //   }

// //   const product = await Product.create({
// //     name,
// //     slug,
// //     category: categoryId,
// //     price,
// //     shortDesc: short_desc || '',
// //     description: description || '',
// //     image: image || null,
// //     isBestseller: !!is_bestseller,
// //   });

// //   res.status(201).json({ product: serializeProduct(product) });
// // }

// // export async function adminUpdateProduct(req, res) {
// //   const { id } = req.params;
// //   const { name, price, compare_price, short_desc, description, ingredients, how_to_use, image, stock, is_bestseller, category_slug } = req.body;

// //   const update = {};
// //   if (name !== undefined) update.name = name;
// //   if (price !== undefined) update.price = price;
// //   if (compare_price !== undefined) update.comparePrice = compare_price;
// //   if (short_desc !== undefined) update.shortDesc = short_desc;
// //   if (description !== undefined) update.description = description;
// //   if (ingredients !== undefined) update.ingredients = ingredients;
// //   if (how_to_use !== undefined) update.howToUse = how_to_use;
// //   if (image !== undefined) update.image = image;
// //   if (stock !== undefined) update.stock = stock;
// //   if (is_bestseller !== undefined) update.isBestseller = !!is_bestseller;
// //   if (category_slug !== undefined) {
// //     const cat = await Category.findOne({ slug: category_slug });
// //     update.category = cat ? cat._id : null;
// //   }

// //   const product = await Product.findByIdAndUpdate(id, update, { new: true }).populate('category');
// //   if (!product) return res.status(404).json({ error: 'Product not found.' });
// //   res.json({ product: serializeProduct(product) });
// // }

// // export async function adminDeleteProduct(req, res) {
// //   const { id } = req.params;
// //   const product = await Product.findByIdAndDelete(id);
// //   if (!product) return res.status(404).json({ error: 'Product not found.' });
// //   res.json({ success: true });
// // }

// // export async function adminListCategories(_req, res) {
// //   const categories = await Category.find().sort({ _id: 1 });
// //   res.json({ categories: categories.map(serializeCategory) });
// // }

// // export async function adminCreateCategory(req, res) {
// //   const { name, image } = req.body;
// //   if (!name) return res.status(400).json({ error: 'Category name is required.' });

// //   let slug = slugify(name);
// //   let suffix = 1;
// //   while (await Category.findOne({ slug })) {
// //     slug = `${slugify(name)}-${suffix++}`;
// //   }

// //   const category = await Category.create({ name, slug, image: image || null });
// //   res.status(201).json({ category: serializeCategory(category) });
// // }

// // export async function adminUpdateCategory(req, res) {
// //   const { id } = req.params;
// //   const { name, image } = req.body;
// //   const update = {};
// //   if (name !== undefined) update.name = name;
// //   if (image !== undefined) update.image = image;

// //   const category = await Category.findByIdAndUpdate(id, update, { new: true });
// //   if (!category) return res.status(404).json({ error: 'Category not found.' });
// //   res.json({ category: serializeCategory(category) });
// // }

// // export async function adminDeleteCategory(req, res) {
// //   const { id } = req.params;
// //   const inUse = await Product.findOne({ category: id });
// //   if (inUse) {
// //     return res.status(400).json({ error: 'Cannot delete a category that still has products in it.' });
// //   }
// //   const category = await Category.findByIdAndDelete(id);
// //   if (!category) return res.status(404).json({ error: 'Category not found.' });
// //   res.json({ success: true });
// // }

// // export async function adminListOrders(req, res) {
// //   const { status } = req.query;
// //   const filter = {};
// //   if (status && status !== 'all') filter.status = status;

// //   const orders = await Order.find(filter).sort({ created_at: -1 });
// //   const withItems = orders.map((o) => ({
// //     ...serializeOrder(o),
// //     customer_name: o.shippingName,
// //     customer_email: null,
// //     items: o.items.map(serializeOrderItem),
// //   }));
// //   res.json({ orders: withItems, statuses: ORDER_STATUSES });
// // }

// // export async function adminUpdateOrderStatus(req, res) {
// //   const { id } = req.params;
// //   const { status } = req.body;

// //   if (!ORDER_STATUSES.includes(status)) {
// //     return res.status(400).json({ error: `Status must be one of: ${ORDER_STATUSES.join(', ')}` });
// //   }

// //   const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
// //   if (!order) return res.status(404).json({ error: 'Order not found.' });

// //   res.json({
// //     order: {
// //       ...serializeOrder(order),
// //       customer_name: order.shippingName,
// //       customer_email: null,
// //       items: order.items.map(serializeOrderItem),
// //     },
// //   });
// // }



// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import Settings from '../models/Settings.js';
// import Product from '../models/Product.js';
// import Category from '../models/Category.js';
// import Order from '../models/Order.js';
// import { DEFAULT_SETTINGS, SETTINGS_FIELDS, SETTINGS_GROUPS } from '../data/defaultSettings.js';
// import { signToken } from '../utils/jwt.js';
// import { serializeProduct, serializeCategory, serializeOrder, serializeOrderItem } from '../utils/serializers.js';

// export const ORDER_STATUSES = ['placed', 'processing', 'dispatched', 'delivered', 'cancelled'];

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

// export async function adminListImages(_req, res) {
//   const imagesDir = path.join(__dirname, '../../public/images');
//   let files = [];
//   try {
//     files = collectImageFiles(imagesDir);
//   } catch {
//     files = [];
//   }
//   res.json({ images: files.sort() });
// }

// function collectImageFiles(dir, prefix = '/images') {
//   let results = [];
//   const entries = fs.readdirSync(dir, { withFileTypes: true });
//   for (const entry of entries) {
//     if (entry.isDirectory()) {
//       results = results.concat(collectImageFiles(path.join(dir, entry.name), `${prefix}/${entry.name}`));
//     } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
//       results.push(`${prefix}/${entry.name}`);
//     }
//   }
//   return results;
// }

// export async function adminUploadImage(req, res) {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No image file was received.' });
//   }
//   res.status(201).json({ path: `/images/uploads/${req.file.filename}` });
// }

// const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'haircare2026';

// export async function adminLogin(req, res) {
//   const { password } = req.body;
//   if (!password || password !== ADMIN_PASSWORD) {
//     return res.status(401).json({ error: 'Incorrect admin password.' });
//   }
//   const token = signToken({ role: 'admin' });
//   res.json({ token });
// }

// export async function getAdminSettings(_req, res) {
//   let doc = await Settings.findOne({ singleton: 'main' });
//   if (!doc) {
//     doc = await Settings.create({ singleton: 'main', values: DEFAULT_SETTINGS });
//   }
//   res.json({
//     settings: { ...DEFAULT_SETTINGS, ...doc.values },
//     fields: SETTINGS_FIELDS,
//     groups: SETTINGS_GROUPS,
//   });
// }

// export async function updateAdminSettings(req, res) {
//   const updates = req.body || {};
//   let doc = await Settings.findOne({ singleton: 'main' });
//   if (!doc) {
//     doc = await Settings.create({ singleton: 'main', values: { ...DEFAULT_SETTINGS, ...updates } });
//   } else {
//     doc.values = { ...DEFAULT_SETTINGS, ...doc.values, ...updates };
//     await doc.save();
//   }
//   res.json({ settings: doc.values });
// }

// function slugify(name) {
//   return name
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/(^-|-$)/g, '');
// }

// const MAX_DESC_WORDS = 500;

// function countWords(text) {
//   const trimmed = String(text || '').trim();
//   if (!trimmed) return 0;
//   return trimmed.split(/\s+/).length;
// }

// // Returns an error message if `short_desc` goes over the word limit, otherwise null.
// function descWordError(short_desc) {
//   if (short_desc !== undefined && countWords(short_desc) > MAX_DESC_WORDS) {
//     return `Description must be ${MAX_DESC_WORDS} words or fewer.`;
//   }
//   return null;
// }

// export async function adminListProducts(_req, res) {
//   const products = await Product.find().populate('category').sort({ _id: -1 });
//   res.json({ products: products.map(serializeProduct) });
// }

// export async function adminCreateProduct(req, res) {
//   const { name, price, category_slug, short_desc, description, image, is_bestseller } = req.body;
//   if (!name || !price) return res.status(400).json({ error: 'Name and price are required.' });

//   const descError = descWordError(short_desc);
//   if (descError) return res.status(400).json({ error: descError });

//   let categoryId = null;
//   if (category_slug) {
//     const cat = await Category.findOne({ slug: category_slug });
//     categoryId = cat ? cat._id : null;
//   }

//   let slug = slugify(name);
//   let suffix = 1;
//   while (await Product.findOne({ slug })) {
//     slug = `${slugify(name)}-${suffix++}`;
//   }

//   const product = await Product.create({
//     name,
//     slug,
//     category: categoryId,
//     price,
//     shortDesc: short_desc || '',
//     description: description || '',
//     image: image || null,
//     isBestseller: !!is_bestseller,
//   });

//   res.status(201).json({ product: serializeProduct(product) });
// }

// export async function adminUpdateProduct(req, res) {
//   const { id } = req.params;
//   const { name, price, compare_price, short_desc, description, ingredients, how_to_use, image, stock, is_bestseller, category_slug } = req.body;

//   const descError = descWordError(short_desc);
//   if (descError) return res.status(400).json({ error: descError });

//   const update = {};
//   if (name !== undefined) update.name = name;
//   if (price !== undefined) update.price = price;
//   if (compare_price !== undefined) update.comparePrice = compare_price;
//   if (short_desc !== undefined) update.shortDesc = short_desc;
//   if (description !== undefined) update.description = description;
//   if (ingredients !== undefined) update.ingredients = ingredients;
//   if (how_to_use !== undefined) update.howToUse = how_to_use;
//   if (image !== undefined) update.image = image;
//   if (stock !== undefined) update.stock = stock;
//   if (is_bestseller !== undefined) update.isBestseller = !!is_bestseller;
//   if (category_slug !== undefined) {
//     const cat = await Category.findOne({ slug: category_slug });
//     update.category = cat ? cat._id : null;
//   }

//   const product = await Product.findByIdAndUpdate(id, update, { new: true }).populate('category');
//   if (!product) return res.status(404).json({ error: 'Product not found.' });
//   res.json({ product: serializeProduct(product) });
// }

// export async function adminDeleteProduct(req, res) {
//   const { id } = req.params;
//   const product = await Product.findByIdAndDelete(id);
//   if (!product) return res.status(404).json({ error: 'Product not found.' });
//   res.json({ success: true });
// }

// export async function adminListCategories(_req, res) {
//   const categories = await Category.find().sort({ _id: 1 });
//   res.json({ categories: categories.map(serializeCategory) });
// }

// export async function adminCreateCategory(req, res) {
//   const { name, image } = req.body;
//   if (!name) return res.status(400).json({ error: 'Category name is required.' });

//   let slug = slugify(name);
//   let suffix = 1;
//   while (await Category.findOne({ slug })) {
//     slug = `${slugify(name)}-${suffix++}`;
//   }

//   const category = await Category.create({ name, slug, image: image || null });
//   res.status(201).json({ category: serializeCategory(category) });
// }

// export async function adminUpdateCategory(req, res) {
//   const { id } = req.params;
//   const { name, image } = req.body;
//   const update = {};
//   if (name !== undefined) update.name = name;
//   if (image !== undefined) update.image = image;

//   const category = await Category.findByIdAndUpdate(id, update, { new: true });
//   if (!category) return res.status(404).json({ error: 'Category not found.' });
//   res.json({ category: serializeCategory(category) });
// }

// export async function adminDeleteCategory(req, res) {
//   const { id } = req.params;
//   const inUse = await Product.findOne({ category: id });
//   if (inUse) {
//     return res.status(400).json({ error: 'Cannot delete a category that still has products in it.' });
//   }
//   const category = await Category.findByIdAndDelete(id);
//   if (!category) return res.status(404).json({ error: 'Category not found.' });
//   res.json({ success: true });
// }

// export async function adminListOrders(req, res) {
//   const { status } = req.query;
//   const filter = {};
//   if (status && status !== 'all') filter.status = status;

//   const orders = await Order.find(filter).sort({ created_at: -1 });
//   const withItems = orders.map((o) => ({
//     ...serializeOrder(o),
//     customer_name: o.shippingName,
//     customer_email: null,
//     items: o.items.map(serializeOrderItem),
//   }));
//   res.json({ orders: withItems, statuses: ORDER_STATUSES });
// }

// export async function adminUpdateOrderStatus(req, res) {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!ORDER_STATUSES.includes(status)) {
//     return res.status(400).json({ error: `Status must be one of: ${ORDER_STATUSES.join(', ')}` });
//   }

//   const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
//   if (!order) return res.status(404).json({ error: 'Order not found.' });

//   res.json({
//     order: {
//       ...serializeOrder(order),
//       customer_name: order.shippingName,
//       customer_email: null,
//       items: order.items.map(serializeOrderItem),
//     },
//   });
// }



import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Settings from '../models/Settings.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../models/Order.js';
import { DEFAULT_SETTINGS, SETTINGS_FIELDS, SETTINGS_GROUPS } from '../data/defaultSettings.js';
import { signToken } from '../utils/jwt.js';
import { serializeProduct, serializeCategory, serializeOrder, serializeOrderItem } from '../utils/serializers.js';

export const ORDER_STATUSES = ['placed', 'processing', 'dispatched', 'delivered', 'cancelled'];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

export async function adminListImages(_req, res) {
  const imagesDir = path.join(__dirname, '../../public/images');
  let files = [];
  try {
    files = collectImageFiles(imagesDir);
  } catch {
    files = [];
  }
  res.json({ images: files.sort() });
}

function collectImageFiles(dir, prefix = '/images') {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      results = results.concat(collectImageFiles(path.join(dir, entry.name), `${prefix}/${entry.name}`));
    } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      results.push(`${prefix}/${entry.name}`);
    }
  }
  return results;
}

export async function adminUploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file was received.' });
  }
  res.status(201).json({ path: `/images/uploads/${req.file.filename}` });
}

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'haircare2026';

export async function adminLogin(req, res) {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect admin password.' });
  }
  const token = signToken({ role: 'admin' });
  res.json({ token });
}

export async function getAdminSettings(_req, res) {
  let doc = await Settings.findOne({ singleton: 'main' });
  if (!doc) {
    doc = await Settings.create({ singleton: 'main', values: DEFAULT_SETTINGS });
  }
  res.json({
    settings: { ...DEFAULT_SETTINGS, ...doc.values },
    fields: SETTINGS_FIELDS,
    groups: SETTINGS_GROUPS,
  });
}

export async function updateAdminSettings(req, res) {
  const updates = req.body || {};
  let doc = await Settings.findOne({ singleton: 'main' });
  if (!doc) {
    doc = await Settings.create({ singleton: 'main', values: { ...DEFAULT_SETTINGS, ...updates } });
  } else {
    doc.values = { ...DEFAULT_SETTINGS, ...doc.values, ...updates };
    await doc.save();
  }
  res.json({ settings: doc.values });
}

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const MAX_DESC_WORDS = 500;

function countWords(text) {
  const trimmed = String(text || '').trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

// Returns an error message if `description` goes over the word limit, otherwise null.
function descWordError(description) {
  if (description !== undefined && countWords(description) > MAX_DESC_WORDS) {
    return `Description must be ${MAX_DESC_WORDS} words or fewer.`;
  }
  return null;
}

export async function adminListProducts(_req, res) {
  const products = await Product.find().populate('category').sort({ _id: -1 });
  res.json({ products: products.map(serializeProduct) });
}

export async function adminCreateProduct(req, res) {
  const { name, price, category_slug, short_desc, description, image, is_bestseller } = req.body;
  if (!name || !price) return res.status(400).json({ error: 'Name and price are required.' });

  const descError = descWordError(description);
  if (descError) return res.status(400).json({ error: descError });

  let categoryId = null;
  if (category_slug) {
    const cat = await Category.findOne({ slug: category_slug });
    categoryId = cat ? cat._id : null;
  }

  let slug = slugify(name);
  let suffix = 1;
  while (await Product.findOne({ slug })) {
    slug = `${slugify(name)}-${suffix++}`;
  }

  const product = await Product.create({
    name,
    slug,
    category: categoryId,
    price,
    shortDesc: short_desc || '',
    description: description || '',
    image: image || null,
    isBestseller: !!is_bestseller,
  });

  res.status(201).json({ product: serializeProduct(product) });
}

export async function adminUpdateProduct(req, res) {
  const { id } = req.params;
  const { name, price, compare_price, short_desc, description, ingredients, how_to_use, image, stock, is_bestseller, category_slug } = req.body;

  const descError = descWordError(description);
  if (descError) return res.status(400).json({ error: descError });

  const update = {};
  if (name !== undefined) update.name = name;
  if (price !== undefined) update.price = price;
  if (compare_price !== undefined) update.comparePrice = compare_price;
  if (short_desc !== undefined) update.shortDesc = short_desc;
  if (description !== undefined) update.description = description;
  if (ingredients !== undefined) update.ingredients = ingredients;
  if (how_to_use !== undefined) update.howToUse = how_to_use;
  if (image !== undefined) update.image = image;
  if (stock !== undefined) update.stock = stock;
  if (is_bestseller !== undefined) update.isBestseller = !!is_bestseller;
  if (category_slug !== undefined) {
    const cat = await Category.findOne({ slug: category_slug });
    update.category = cat ? cat._id : null;
  }

  const product = await Product.findByIdAndUpdate(id, update, { new: true }).populate('category');
  if (!product) return res.status(404).json({ error: 'Product not found.' });
  res.json({ product: serializeProduct(product) });
}

export async function adminDeleteProduct(req, res) {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) return res.status(404).json({ error: 'Product not found.' });
  res.json({ success: true });
}

export async function adminListCategories(_req, res) {
  const categories = await Category.find().sort({ _id: 1 });
  res.json({ categories: categories.map(serializeCategory) });
}

export async function adminCreateCategory(req, res) {
  const { name, image } = req.body;
  if (!name) return res.status(400).json({ error: 'Category name is required.' });

  let slug = slugify(name);
  let suffix = 1;
  while (await Category.findOne({ slug })) {
    slug = `${slugify(name)}-${suffix++}`;
  }

  const category = await Category.create({ name, slug, image: image || null });
  res.status(201).json({ category: serializeCategory(category) });
}

export async function adminUpdateCategory(req, res) {
  const { id } = req.params;
  const { name, image } = req.body;
  const update = {};
  if (name !== undefined) update.name = name;
  if (image !== undefined) update.image = image;

  const category = await Category.findByIdAndUpdate(id, update, { new: true });
  if (!category) return res.status(404).json({ error: 'Category not found.' });
  res.json({ category: serializeCategory(category) });
}

export async function adminDeleteCategory(req, res) {
  const { id } = req.params;
  const inUse = await Product.findOne({ category: id });
  if (inUse) {
    return res.status(400).json({ error: 'Cannot delete a category that still has products in it.' });
  }
  const category = await Category.findByIdAndDelete(id);
  if (!category) return res.status(404).json({ error: 'Category not found.' });
  res.json({ success: true });
}

export async function adminListOrders(req, res) {
  const { status } = req.query;
  const filter = {};
  if (status && status !== 'all') filter.status = status;

  const orders = await Order.find(filter).sort({ created_at: -1 });
  const withItems = orders.map((o) => ({
    ...serializeOrder(o),
    customer_name: o.shippingName,
    customer_email: null,
    items: o.items.map(serializeOrderItem),
  }));
  res.json({ orders: withItems, statuses: ORDER_STATUSES });
}

export async function adminUpdateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  if (!ORDER_STATUSES.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${ORDER_STATUSES.join(', ')}` });
  }

  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  res.json({
    order: {
      ...serializeOrder(order),
      customer_name: order.shippingName,
      customer_email: null,
      items: order.items.map(serializeOrderItem),
    },
  });
}

