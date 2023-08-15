import express from 'express';
import CartRoutes from './Cart.routes.js';

const router = express.Router();

router.use('/cart', CartRoutes);

export default router;