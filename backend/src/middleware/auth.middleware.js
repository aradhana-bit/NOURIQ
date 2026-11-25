import jwt from 'jsonwebtoken';
export function authenticate(req, res, next) {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  if (process.env.DEMO_LOGIN_ENABLED === 'true' && process.env.DEMO_ACCESS_TOKEN && token === process.env.DEMO_ACCESS_TOKEN) {
    req.user = { id: 'nouriq-demo-admin', email: process.env.DEMO_ADMIN_EMAIL || 'demo@nouriq.local', role: 'admin', name: 'NOURIQ Demo Admin', demo: true };
    return next();
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired access token' });
  }
}
export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ message: 'Insufficient permissions' });
    next();
  };
}
