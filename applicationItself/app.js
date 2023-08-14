const express = require('express')
const session = require('express-session')
const app = express()
const routes  = require('/server/Routes/routes')
// activate the session to use a unique middleware in the cart route
app.use(session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized:true,
    isAuthenticated : false
}));

// Set up EJS as view engine
app.set('view engine', 'ejs');

app.use('/', routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



