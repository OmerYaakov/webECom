const express = require('express')
const routes = express.Router()

// Home page
router.route('/').get((req, res) => {
    res.render('index');
});

// Product page
routes.route('/product').get((req, res) => {
    res.render('product');
});

// Admin page
routes.route('/admin').get((req, res) => {
    res.render('admin');
});

// User settings page
routes.route('/user/settings').get((req, res) => {
    res.render('user/settings');
});

// About us page
routes.route('/about').get((req, res) => {
    res.render('about');
});



module.exports=routes;