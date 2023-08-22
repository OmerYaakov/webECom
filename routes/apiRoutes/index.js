import express from 'express';
import CartRoutes from './Cart.routes.js';
import CartProductRoutes from "./CartProduct.routes.js";
import CategoryRoutes from "./Category.routes.js";
import UserRoutes from "./User.routes.js";
import OrderRoutes from "./Order.routes.js";
import ProductRoutes from "./Product.routes.js";
import ContactRoutes from "./Contact.routes.js";
import BranchRoutes from "./Branch.routes.js";
import PhotosRoutes from "./photos.routes.js";

const router = express.Router();

router.use('/carts', CartRoutes);
router.use('/cartProduct', CartProductRoutes);
router.use('/users', UserRoutes);
router.use('/categories', CategoryRoutes);
router.use('/orders', OrderRoutes);
router.use('/products', ProductRoutes);
router.use('/contacts', ContactRoutes);
router.use('/branches', BranchRoutes);
router.use('/photos', PhotosRoutes);

export default router;