
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './src/routes/auth.routes.js';
import dashboardRoutes from './src/routes/dashboard.routes.js';
import cafeteriaRoutes from './src/routes/cafeteria.routes.js';
import resourceRoutes from './src/routes/resource.routes.js';
import analyticsRoutes from './src/routes/analytics.routes.js';
import { pool } from './src/config/db.js';
import { errorHandler } from './src/middleware/error.middleware.js';
const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.get('/', (req, res) => res.json({ status: 'ok', service: 'nouriq-cafeteria-api', health: '/api/health' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'cafeteria-api' }));
app.get('/api/db-health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api', cafeteriaRoutes);
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
