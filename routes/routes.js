import express from 'express';
const router = express.Router();

router.route('/').get()

router.route('/:id')
export default router;