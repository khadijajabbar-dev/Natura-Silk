import { Router } from 'express';
import { getSettings } from '../controllers/settingsController.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.get('/', catchAsync(getSettings));

export default router;
