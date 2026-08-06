import { Router } from 'express';
import { checkout, listOrders, getOrder, cancelOrder } from '../controllers/orderController.js';
import { identifyGuest } from '../middleware/auth.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.use(identifyGuest);
router.post('/checkout', catchAsync(checkout));
router.get('/', catchAsync(listOrders));
router.get('/:id', catchAsync(getOrder));
router.put('/:id/cancel', catchAsync(cancelOrder));

export default router;
