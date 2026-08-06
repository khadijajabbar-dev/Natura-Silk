import { Router } from 'express';
import { signup, login, me, updateProfile } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.post('/signup', catchAsync(signup));
router.post('/login', catchAsync(login));
router.get('/me', requireAuth, catchAsync(me));
router.put('/me', requireAuth, catchAsync(updateProfile));

export default router;
