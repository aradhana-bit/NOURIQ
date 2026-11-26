import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { summary, report } from '../controllers/analytics.controller.js';
const router = Router();
router.use(authenticate);
router.get('/summary', summary);
router.get('/report', authorize('admin','manager'), report);
export default router;
