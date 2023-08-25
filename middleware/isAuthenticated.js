export default function isAuthenticated(req, res, next) {
    if (req.session.isAuth) {
        // User is authenticated, proceed
        console.log("session in if", req.session.isAuth);        
        next(true);
    } else {
        // User is not authenticated, handle as needed (e.g., redirect to login)
       /* res.redirect('/login');*/
        // window.location.href = "/login"
        req.session.isAuth = false;
        console.log("session in else", req.session.isAuth);
        next(false)
    }
}
