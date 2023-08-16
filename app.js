import express from 'express';
import routes from "./routes/routes.js";
import apiRoutes from "./routes/apiRoutes/index.js";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();

mongoose.connect('mongodb+srv://AvivNat:AvivKaved@shagal.jaexhqx.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.json())


// Set up EJS as view engine
app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/api', apiRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const date = new Date()