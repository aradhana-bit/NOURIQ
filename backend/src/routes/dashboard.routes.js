import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { dashboard } from '../controllers/dashboard.controller.js';
const router = Router();
router.get('/', authenticate, dashboard);
export default router;
