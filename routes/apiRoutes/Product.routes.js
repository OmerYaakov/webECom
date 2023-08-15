import express from 'express';
const router = express.Router();
import { create, findAll, remove, findOne, update } from '../../controllers/Product.controller.js';

router.post('/', create);
router.get('/', findAll);
router.get('/:id', findOne);
router.delete('/:id', remove);
router.put('/:id', update);


export default router;