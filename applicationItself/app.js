const express = require('express')
const session = require('express-session')
const app = express()
// activate the session to use a unique middleware in the cart route
app.use(session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized:true,
    isAuthenticated : false
}));



