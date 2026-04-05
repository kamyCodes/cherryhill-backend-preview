const router = require('express').Router();
const authRoutes = require('./auth.routes');
const adminRoutes = require('./admin.routes');
const publicRoutes = require('./public.routes');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/public', publicRoutes);

module.exports = router;