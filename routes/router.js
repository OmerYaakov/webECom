const express = require("express")
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
router.route('/login').get((req, res) => {
    res.render('login');
});
router.route('/cart').get((req, res) => {
    res.render('cart');
});
router.route('/wishlist').get((req, res) => {
    res.render('wishlist');
});
router.route('/catalog').get((req, res) => {
    res.render('catalog');
});
router.route('/contact').get((req, res) => {
    res.render('contact');
});
router.route('/terms').get((req, res) => {
    res.render('terms');
});
router.route('/locations').get((req, res) => {
    res.render('locations');
});

module.exports = router;
