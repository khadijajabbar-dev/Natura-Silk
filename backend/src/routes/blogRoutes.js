import { Router } from 'express';
import { listBlogs, getBlog } from '../controllers/blogController.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.get('/', catchAsync(listBlogs));
router.get('/:slug', catchAsync(getBlog));

export default router;
