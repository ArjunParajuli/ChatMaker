import express from 'express';
import 'dotenv/config';
import { Server } from 'socket.io'; // Import the Server class from Socket.IO for WebSocket communication
import { createServer } from 'http'; // Import the native HTTP server
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express(); // Initializes the Express application
const server = new createServer(app) // Creates an HTTP server that works with both Express and Socket.IO

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
}))

// Configure CORS specifically for the Socket.IO server
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
}); // Socket.IO instance

io.on("connection", (socket)=>{
    socket.on('message', ({msg, roomId})=>{
        // console.log(`Message from ${socket.id}: ${msg}`)
        // io.emit('received-msg', msg) // send to all users including the sender
        socket.to(roomId).emit('dm', msg); // send to particular user
    })

    socket.on("join-room", (room)=>{
        socket.join(room)
    })

    socket.on("disconnect", ()=>{
        console.log("User Disconnected ", socket.id)
      })

})

// ----------------------- Deployment -----------------

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, 'client', 'dist'))); 

app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')); 
});

// ------------------------------------------------------



app.get('/', (req, res) => {
    res.send('App listening');
});

// Use server.listen, not app.listen bcoz both express app and socket server must use the same server instance
server.listen(process.env.PORT, () => {
    console.log('App listening on port:', process.env.PORT);
});
