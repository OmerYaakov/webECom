import express from 'express';
const router = express.Router();
import { create, findAll, remove, findOneByName,findOneByID, update } from '../../controllers/Product.controller.js';

router.post('/', create);
router.get('/', findAll);
router.get('/:id', findOneByID); // Use a different route name
// router.get('/product/:productName', findOneByName);
router.delete('/:id', remove);
router.put('/:id', update);

export default router;