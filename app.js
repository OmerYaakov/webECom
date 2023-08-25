import dotenv from 'dotenv';

dotenv.config();
import express from "express";
import mainRouter from "./routes/router.js";
import apiRoutes from "./routes/apiRoutes/index.js";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import http from "http";
import {Server as SocketIOServer} from 'socket.io';
import session from 'express-session'
import MongeDBSession from 'connect-mongodb-session'
import multer from 'multer'
import { uploadFile, getFileStream } from "./s3.js";
import fs from 'fs'
import util from 'util'

const mdbs = MongeDBSession(session)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

// Set up EJS as the view engine
mongoose.connect('mongodb+srv://AvivNat:AvivKaved@shagal.jaexhqx.mongodb.net/', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const mdbs = MongeDBSession(session)


const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);
const app = express();

// Set up EJS as the view engine

const store = new mdbs({
    uri: 'mongodb+srv://AvivNat:AvivKaved@shagal.jaexhqx.mongodb.net/', collection: "mySessions"
    uri: 'mongodb+srv://AvivNat:AvivKaved@shagal.jaexhqx.mongodb.net/',
    collection: "mySessions"
})
//code for locations...
app.get('/api/data', async (req, res) => {
    try {
        const collection = mongoose.connection.db.collection('branches'); // Replace with your collection name

        // Fetch data from MongoDB
        const data = await collection.find({}).toArray();

        // Format data for Bing Maps API
        const locations = data.map(item => ({
            latitude: item.latitude,
            longitude: item.longitude
        }));

        // Send the data to the frontend
        res.json(locations);
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({error: 'Error fetching data from MongoDB'});
    }
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: 'keyboard cat', resave: false, saveUninitialized: true, store: store
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: store
}))

// importing multer + util+fs
const upload = multer({ dest: 'uploads/' })
const unlinkFile = util.promisify(fs.unlink)

// all of these '/images' we need to get out to a router...
app.get('images/:key', (req, res) => {
    const key = req.params.Key
    const readStream = getFileStream(key)
    readStream.pipe(res)
})

app.post('/images', upload.single('avatar'), async (req, res) => {
    try {
        //uploading the file to s3 bucket
        const result = await uploadFile(req.file);

        //delete the file from the uploads folder...
        await unlinkFile(req.file.path)

        console.log('Upload result:', result);

        //right now result.Key undefined,...need to be fixed!
        res.send(`/images/${result.Key}`)


    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send("Error uploading image.");
    }
});


// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))
app.use(express.urlencoded({ extended: true }))

// Use the router
app.use('/', mainRouter); // Use the router for the main path
app.use('/api', apiRoutes);

const server = http.createServer(app);
const io = new SocketIOServer(server);

io.on('connection', client => {
    console.log('New WS Connection...');
    client.emit('newConnection', 'Welcome to the webapp!');
    client.on('whatever', msg => {
        console.log(msg);
    });
});

io.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));