import express from 'express';
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();
export default router;

// Home page
router.route('/').get((req, res) => {
    // req.session.isAuth=true
    console.log("session", req.session.isAuth)
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
router.route('/login').get(isAuthenticated,(req, res) => {

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
// router.route('/locations').get((req, res) => {
//     res.render('locations');
// });
router.route('/signup').get((req, res) => {
    res.render('signup');
});
router.route('/account').get((req, res) => {
    res.render('account');
});
router.route('/branches').get((req, res) => {
    res.render('branches');
});
router.route('/admin/editbranches').get((req, res) => {
    res.render('editbranches');
});
router.route('/admin/products').get((req, res) => {
    res.render('admincrudproducts');
});
router.route('/admin/salestrack').get((req, res) => {
    res.render('salestrack');
});
router.route('/create_collection').get((req, res) => {
    res.render('create_collection');
});
router.route('/delete_collection').get((req, res) => {
    res.render('delete_collection');
});
router.route('/edit_collection').get((req, res) => {
    res.render('edit_collection');
});
router.route('/wishlist').get((req, res) => {
    res.render('wishlist');
});
router.route('/admin/collection').get((req, res) => {
    res.render('collection');
});
router.route('/admin/couponsadmin').get((req, res) => {
    res.render('couponsadmin');
});

router.route('/createcouponsadmin').get((req, res) => {
    res.render('createcouponsadmin');
});
router.route('/editcouponsadmin').get((req, res) => {
    res.render('editcouponsadmin');
});
router.route('/deletecouponsadmin').get((req, res) => {
    res.render('deletecouponsadmin');
});

router.route('/admin/orders').get((req, res) => {
    res.render('adminorders');
});

