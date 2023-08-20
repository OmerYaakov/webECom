import express from 'express';
const router = express.Router();
import { create, findAll, remove, findOne } from '../../controllers/Contact.controller.js';

router.post('/', create);
router.get('/', findAll);
router.get('/:id', findOne);
router.delete('/:id', remove);


export default router;