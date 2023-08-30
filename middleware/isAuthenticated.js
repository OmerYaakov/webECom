export default function isAuthenticated(req, res, next) {
    if (req.session.isAuth) {
        // User is authenticated, proceed
        next(true);
    } else {
        // User is not authenticated, handle as needed (e.g., redirect to login)
       /* res.redirect('/login');*/
        // window.location.href = "/login"
        req.session.isAuth = false;
        next(false)
    }
}
