import { Router } from 'express';
import { submitContactMessage, listContactMessages } from '../controllers/contactController.js';
import { requireAdmin } from '../middleware/auth.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.post('/', catchAsync(submitContactMessage));
router.get('/', requireAdmin, catchAsync(listContactMessages));

export default router;
