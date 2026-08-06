import { Router } from 'express';
import {
  adminLogin,
  getAdminSettings,
  updateAdminSettings,
  adminListImages,
  adminUploadImage,
  adminListProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminListCategories,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
  adminListOrders,
  adminUpdateOrderStatus,
} from '../controllers/adminController.js';
import {
  adminListBlogs,
  adminCreateBlog,
  adminUpdateBlog,
  adminDeleteBlog,
} from '../controllers/blogController.js';
import { upload } from '../middleware/upload.js';
import { requireAdmin } from '../middleware/auth.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.post('/login', catchAsync(adminLogin));

router.use(requireAdmin);
router.get('/images', catchAsync(adminListImages));
router.post('/images/upload', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message || 'Upload failed.' });
    next();
  });
}, catchAsync(adminUploadImage));
router.get('/settings', catchAsync(getAdminSettings));
router.put('/settings', catchAsync(updateAdminSettings));
router.get('/categories', catchAsync(adminListCategories));
router.post('/categories', catchAsync(adminCreateCategory));
router.put('/categories/:id', catchAsync(adminUpdateCategory));
router.delete('/categories/:id', catchAsync(adminDeleteCategory));
router.get('/products', catchAsync(adminListProducts));
router.post('/products', catchAsync(adminCreateProduct));
router.put('/products/:id', catchAsync(adminUpdateProduct));
router.delete('/products/:id', catchAsync(adminDeleteProduct));
router.get('/orders', catchAsync(adminListOrders));
router.put('/orders/:id/status', catchAsync(adminUpdateOrderStatus));

// Blog management
router.get('/blogs', catchAsync(adminListBlogs));
router.post('/blogs', catchAsync(adminCreateBlog));
router.put('/blogs/:id', catchAsync(adminUpdateBlog));
router.delete('/blogs/:id', catchAsync(adminDeleteBlog));

export default router;
