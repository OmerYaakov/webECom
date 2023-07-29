import express from 'express';
const router = express.Router();

// Home page
router.route('/').get((req, res) => {
    res.render('index');
});

// Product page
router.route('/product').get((req, res) => {
    res.render('product');
});

// Admin page
router.route('/admin').get((req, res) => {
    res.render('admin');
});

// User settings page
router.route('/user/settings').get((req, res) => {
    res.render('user/settings');
});

// About us page
router.route('/about').get((req, res) => {
    res.render('about');
});

export default router;
