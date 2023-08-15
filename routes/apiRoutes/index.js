import express from 'express';
import CartRoutes from './Cart.routes.js';
import CartProductRoutes from "./CartProduct.routes.js";
import CategoryRoutes from "./Category.routes.js";
import UserRoutes from "./User.routes.js";
import OrderRoutes from "./Order.routes.js";

const router = express.Router();

router.use('/carts', CartRoutes);
router.use('/cartProduct', CartProductRoutes);
router.use('/users', UserRoutes);
router.use('/categories', CategoryRoutes);
router.use('/orders', OrderRoutes);


export default router;