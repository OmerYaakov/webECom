import express from 'express';
const router = express.Router();
import { create, findAll, remove, update } from '../../controllers/Collection.controller.js';

router.post('/', create);
router.get('/', findAll);
router.delete('/:id', remove);
router.put('/:id', update);


export default router;