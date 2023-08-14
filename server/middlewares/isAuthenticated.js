function isAuthenticated(req, res, next){
    if(req.session.isAuthenticated)
        next();
    else{
        res.status(401).json({message: 'Unauthorized'})
    }
}

module.exports=isAuthenticated;