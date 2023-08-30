import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mainRouter from "./routes/router.js";
import apiRoutes from "./routes/apiRoutes/index.js";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from "http";
import { Server as SocketIOServer } from 'socket.io';
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

// Set up EJS as the view engine

const store = new mdbs({
    uri: 'mongodb+srv://AvivNat:AvivKaved@shagal.jaexhqx.mongodb.net/',
    collection: "mySessions"
})
app.use(express.static(__dirname + '/facebookAPI'));
//code for locations...
app.get('/api/map', async (req, res) => {
    try {
        const collection = mongoose.connection.db.collection('branches'); // Replace with your collection name

        // Fetch data from MongoDB
        const data = await collection.find({}).toArray();
        // Send the data to the frontend
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ error: 'Error fetching data from MongoDB' });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/photos/'); // Uploads will be stored in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
    console.log("file uploaded " + req.file.originalname);
    res.status(200).json({ message: 'success!' });
});

app.get('/api/facebook', async (req, res) => {
    try {
        res.type('application/javascript'); // Set the correct MIME type
        res.sendFile(__dirname + '/facebookAPI/facebook.js'); // Send the JavaScript file
        console.log("facebook.js sent");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred");
    }
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: store
}))

// importing multer + util+fs
// const upload = multer({ dest: 'uploads/' })
// const unlinkFile = util.promisify(fs.unlink)

// // all of these '/images' we need to get out to a router...
// app.get('images/:key', (req, res) => {
//     const key = req.params.Key
//     const readStream = getFileStream(key)
//     readStream.pipe(res)
// })

// app.post('/images', upload.single('avatar'), async (req, res) => {
//     try {
//         //uploading the file to s3 bucket
//         const result = await uploadFile(req.file);

//         //delete the file from the uploads folder...
//         await unlinkFile(req.file.path)

//         console.log('Upload result:', result);

//         //right now result.Key undefined,...need to be fixed!
//         res.send(`/images/${result.Key}`)


//     } catch (error) {
//         console.error('Error uploading image:', error);
//         res.status(500).send("Error uploading image.");
//     }
// });


// Set up EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

// Use the router
app.use('/', mainRouter); // Use the router for the main path
app.use('/api', apiRoutes);

const server = http.createServer(app);
const io = new SocketIOServer(server);

io.on('connection', client => {
    console.log('New WS Connection...');
    client.on('storageUpdate', (message) => {
        console.log(message);
        io.emit('storageUpdate', message);
    });
});

io.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

