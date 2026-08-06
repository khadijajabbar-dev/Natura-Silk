import { Router } from 'express';
import { listReviews, createReview } from '../controllers/reviewController.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.get('/', catchAsync(listReviews));
router.post('/', catchAsync(createReview));

export default router;
