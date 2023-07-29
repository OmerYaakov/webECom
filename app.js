import express from 'express';
import routes from "./routes/routes.js";

const app = express();

// Set up EJS as view engine
app.set('view engine', 'ejs');

app.use('/', routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
