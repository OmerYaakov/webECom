import express from 'express';
const router = express.Router();
import { create, findAll, remove, findOne, update, findByUserNameAndPassword } from '../../controllers/User.controller.js';

router.post('/', create);
router.get('/', (req, res) => {
    if (req.query.username && req.query.password) {
        findByUserNameAndPassword(req, res);
    }
    else {
        findAll(req, res);
    }
});
router.get('/:id', findOne);
router.delete('/:id', remove);
router.put('/:id', update);


export default router;