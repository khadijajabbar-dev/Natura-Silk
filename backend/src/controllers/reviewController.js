import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { serializeReview } from '../utils/serializers.js';

// Public — GET /api/reviews?product_id=xxx
export async function listReviews(req, res) {
  const { product_id } = req.query;
  if (!product_id) return res.status(400).json({ error: 'product_id is required.' });

  const reviews = await Review.find({ product: product_id }).sort({ created_at: -1 });
  res.json({ reviews: reviews.map(serializeReview) });
}

// Public — POST /api/reviews
export async function createReview(req, res) {
  const { product_id, author_name, rating, comment } = req.body;

  if (!product_id || !author_name || !rating) {
    return res.status(400).json({ error: 'product_id, author_name, and rating are required.' });
  }

  const ratingNum = Number(rating);
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
  }

  const product = await Product.findById(product_id);
  if (!product) return res.status(404).json({ error: 'Product not found.' });

  const review = await Review.create({
    product: product_id,
    authorName: author_name,
    rating: ratingNum,
    comment: comment || '',
  });

  // Update product's cached rating & review count
  const allReviews = await Review.find({ product: product_id });
  const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
  await Product.findByIdAndUpdate(product_id, {
    rating: Math.round(avg * 10) / 10,
    reviewCount: allReviews.length,
  });

  res.status(201).json({ review: serializeReview(review) });
}
