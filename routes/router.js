import express from 'express';


const router = express.Router();
export default router;

// Home page
router.route('/').get((req, res) => {
    if (!req.session.isAuth) {
        req.session.isAuth = false;
    }
    res.render('index', { isAuth: req.session.isAuth }); // Move the closing parenthesis here
});



// Product page
router.route('/product').get((req, res) => {
    res.render('product',{isAuth: req.session.isAuth});
});

// Admin page
router.route('/admin').get((req, res) => {
    if (req?.session?.user?.role == 'admin') {
        res.render('admin', { isAuth: req.session.isAuth });
    }
    else
        // redirect to home page if not admin
        res.redirect('/');
});

// User settings page
router.route('/user/settings').get((req, res) => {
    res.render('user/settings', { isAuth: req.session.isAuth });
});

// About us page
router.route('/about').get((req, res) => {
    res.render('about', { isAuth: req.session.isAuth });
});
router.route('/login').get((req, res) => {
    res.render('login', { isAuth: req.session.isAuth, user: req.session.user });
});
router.route('/cart').get((req, res) => {
    res.render('cart', { isAuth: req.session.isAuth, user: req.session.user });
});
router.route('/wishlist').get((req, res) => {
    res.render('wishlist', { isAuth: req.session.isAuth });
});
router.route('/catalog').get((req, res) => {
    console.log(req.session.user);
    res.render('catalog', { isAuth: req.session.isAuth, user: req.session.user });
});
router.route('/contact').get((req, res) => {
    res.render('contact', { isAuth: req.session.isAuth });
});
router.route('/terms').get((req, res) => {
    res.render('terms', { isAuth: req.session.isAuth });
});
// router.route('/locations').get((req, res) => {
//     res.render('locations');
// });
router.route('/signup').get((req, res) => {
    res.render('signup', { isAuth: req.session.isAuth });
});
router.route('/account').get((req, res) => {
    res.render('account', { isAuth: req.session.isAuth, user: req.session.user });
});
router.route('/branches').get((req, res) => {
    res.render('branches', { isAuth: req.session.isAuth });
});
router.route('/admin/editbranches').get((req, res) => {
    res.render('editbranches', { isAuth: req.session.isAuth });
});
router.route('/admin/products').get((req, res) => {
    res.render('admincrudproducts', { isAuth: req.session.isAuth });
});
router.route('/admin/salestrack').get((req, res) => {
    res.render('salestrack', { isAuth: req.session.isAuth });
});
router.route('/create_collection').get((req, res) => {
    res.render('create_collection', { isAuth: req.session.isAuth });
});
router.route('/delete_collection').get((req, res) => {
    res.render('delete_collection', { isAuth: req.session.isAuth });
});
router.route('/edit_collection').get((req, res) => {
    res.render('edit_collection', { isAuth: req.session.isAuth });
});
router.route('/wishlist').get((req, res) => {
    res.render('wishlist', { isAuth: req.session.isAuth });
});
router.route('/admin/collection').get((req, res) => {
    res.render('collection', { isAuth: req.session.isAuth });
});
router.route('/admin/couponsadmin').get((req, res) => {
    res.render('couponsadmin', { isAuth: req.session.isAuth });
});

router.route('/createcouponsadmin').get((req, res) => {
    res.render('createcouponsadmin', { isAuth: req.session.isAuth });
});
router.route('/editcouponsadmin').get((req, res) => {
    res.render('editcouponsadmin', { isAuth: req.session.isAuth });
});
router.route('/deletecouponsadmin').get((req, res) => {
    res.render('deletecouponsadmin', { isAuth: req.session.isAuth });
});

router.route('/admin/orders').get((req, res) => {
    res.render('adminorders', { isAuth: req.session.isAuth });
});

router.route('/logout').get((req, res) => {

    res.clearCookie('connect.sid');

    req.session.destroy((err) => {
        if (err)
            console.error('Error destroying session : ', err)
        else
            console.log('Session destroyed successfully')

        res.render('index', { isAuth: false })
    })
})
