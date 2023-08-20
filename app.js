import  express from "express";
import routes from "./routes/routes.js";
import apiRoutes from "./routes/apiRoutes/index.js";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();

// Set up EJS as the view engine
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

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));


// Use the router
app.use('/', mainRouter); // Use the router for the main path
app.use('/', routes);
app.use('/api', apiRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const date = new Date()