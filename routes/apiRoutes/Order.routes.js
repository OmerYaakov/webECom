import express from 'express';
const router = express.Router();
import { create, findAll, remove, findOne, update, ordersGroupByUserId } from '../../controllers/Order.controller.js';

router.post('/', create);
router.get('/', (req, res) => {
    if (req.query.getOrdersByUserId) {
        ordersGroupByUserId(req, res);
    }
    else {
        findAll(req, res);
    }
});
router.get('/:id', findOne);
router.delete('/:id', remove);
router.put('/:id', update);


export default router;