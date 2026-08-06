import { Router } from 'express';
import { getCart, addToCart, updateCartItem, removeCartItem } from '../controllers/cartController.js';
import { identifyGuest } from '../middleware/auth.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.use(identifyGuest);
router.get('/', catchAsync(getCart));
router.post('/', catchAsync(addToCart));
router.put('/:id', catchAsync(updateCartItem));
router.delete('/:id', catchAsync(removeCartItem));

export default router;
