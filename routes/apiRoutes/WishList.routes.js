import express from 'express';
const router = express.Router();
import { create, findAll, remove, findOne, update } from '../../controllers/WishList.controller.js';

router.post('/', create);
router.get('/', findAll);
router.get('/:id', findOne);
router.delete('/:id', remove);
router.put('/:id', (req, res) => {
    console.log("update" + req.params.id);
    update(req, res)
});


export default router;