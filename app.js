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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


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
app.use('/', mainRouter);
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




const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));