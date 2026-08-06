
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Review from '../models/Review.js';
import { serializeProduct, serializeCategory, serializeReview } from '../utils/serializers.js';

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function listCategories(_req, res) {
  const categories = await Category.find().sort({ _id: 1 });
  res.json({ categories: categories.map(serializeCategory) });
}

export async function listProducts(req, res) {
  const { category, search, bestsellers, sort } = req.query;
  const filter = {};

  if (category) {
    const cat = await Category.findOne({ slug: category });
    filter.category = cat ? cat._id : null;
  }
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { shortDesc: { $regex: search, $options: 'i' } },
    ];
  }
  if (bestsellers === 'true') {
    filter.isBestseller = true;
  }

  let sortSpec = { _id: 1 };
  if (sort === 'price_asc') sortSpec = { price: 1 };
  else if (sort === 'price_desc') sortSpec = { price: -1 };
  else if (sort === 'rating') sortSpec = { rating: -1 };

  const products = await Product.find(filter).populate('category').sort(sortSpec);
  res.json({ products: products.map(serializeProduct) });
}

export async function getProduct(req, res) {
  const { slug } = req.params;
  let product = await Product.findOne({ slug }).populate('category');

  // Be forgiving: if the incoming slug isn't an exact match (e.g. it came
  // from an admin-entered value like "Nourishing Conditioner" instead of
  // "nourishing-conditioner"), retry against the normalized form.
  if (!product) {
    const normalized = slugify(decodeURIComponent(slug));
    if (normalized && normalized !== slug) {
      product = await Product.findOne({ slug: normalized }).populate('category');
    }
  }

  if (!product) return res.status(404).json({ error: 'Product not found.' });

  const reviews = await Review.find({ product: product._id }).sort({ created_at: -1 });
  const related = await Product.find({ category: product.category, _id: { $ne: product._id } }).limit(4);

  res.json({
    product: serializeProduct(product),
    reviews: reviews.map(serializeReview),
    related: related.map(serializeProduct),
  });
}
