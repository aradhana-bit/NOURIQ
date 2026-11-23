import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { listTable } from '../controllers/cafeteria.controller.js';
const router = Router();
router.get('/data/:table', authenticate, listTable);
router.get('/manager/overview', authenticate, authorize('manager','admin'), (req, res) => res.json({ message: 'Manager route active' }));
export default router;
