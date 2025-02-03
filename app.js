// index.js
const express = require('express');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const pageRoutes = require('./routes/page');
const Chat = require('./models/chat');


const server = http.createServer(app);
const io = socketio(server);
const jwtSecret = 'your_jwt_secret'; // In production, use an environment variable

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// Connect to MongoDB (adjust the URI as needed)
mongoose
  .connect('mongodb://localhost:27017/chatapp', {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set EJS as the view engine and define the views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Use routers
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/', pageRoutes);

// Socket.io middleware to authenticate connections using JWT
io.use((socket, next) => {
  // The token may be sent in handshake.auth or handshake.query
  const token = socket.handshake.auth.token || socket.handshake.query.token;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        console.log('Socket authentication error:', err);
        return next(new Error('Authentication error'));
      }
      socket.user = decoded; // Attach user info (id, username) to socket
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
});

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log(`User ${socket.user.username} connected`);

  // Listen for chat messages from clients
  socket.on('chatMessage', async (data) => {
    const newChat = new Chat({
      from: socket.user.username,
      msg: data.msg,
      created_at: new Date()
    });
    try {
      await newChat.save();
      // Broadcast the new message to all connected clients
      io.emit('message', newChat);
    } catch (err) {
      console.error('Error saving chat message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.user.username} disconnected`);
  });
});

// Start the server on port 8080
server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
