import { Router } from 'express';
import { listProducts, getProduct, listCategories } from '../controllers/productController.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.get('/categories', catchAsync(listCategories));
router.get('/', catchAsync(listProducts));
router.get('/:slug', catchAsync(getProduct));

export default router;
