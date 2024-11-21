console.log("Starting server...");

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an Express app
const app = express();
console.log("Express app created.");

// Create an HTTP server and bind it to the Express app
const server = http.createServer(app);
console.log("HTTP server created.");

// Initialize Socket.IO on the HTTP server
const io = socketIo(server);
console.log("Socket.IO initialized.");

// Serve static files from the 'public' directory
app.use(express.static('public'));
console.log("Static files served from 'public'.");

// Define the behavior when a user connects to the server
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle chat messages sent by the client
    socket.on('chat message', (msg) => {
        console.log('Message received: ', msg);
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });

    // Handle when the user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Set the port the server will listen on (default is 3000)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
