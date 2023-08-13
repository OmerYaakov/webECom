const express = require('express');
const path = require('path');
const mainRouter = require('./routes/router'); // Require the router file
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the router
app.use('/', mainRouter); // Use the router for the main path

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
