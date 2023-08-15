import express from 'express';
import routes from "./routes/routes.js";
import apiRoutes from "./routes/apiRoutes/index.js";

const app = express();

// Set up EJS as view engine
app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/api', apiRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
