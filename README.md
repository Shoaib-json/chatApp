# Real-Time Chat Application

A real-time chat application built with Node.js, Express, Socket.IO, and MongoDB. The application features user authentication using JWT and Passport.js.

## Features

- Real-time messaging using Socket.IO
- User authentication with JWT
- MongoDB for message and user storage
- EJS templating engine for views
- RESTful API endpoints for chat and authentication
- Static file serving
- Secure socket connections with JWT verification

## Prerequisites

- Node.js (v12 or higher)
- MongoDB (v4.0 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Configure MongoDB:
- Ensure MongoDB is running locally on port 27017
- The application will create a database named 'chatapp'

4. Environment Setup:
- Create a `.env` file in the root directory
- Add the following configuration:
```
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://localhost:27017/chatapp
PORT=8080
```

## Project Structure

```
├── config/
│   └── passport.js
├── models/
│   └── chat.js
├── routes/
│   ├── auth.js
│   ├── chat.js
│   └── page.js
├── views/
├── public/
└── index.js
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Chat Routes
- `GET /api/chat` - Get chat messages
- `POST /api/chat` - Create a new message

## Socket.IO Events

### Client to Server
- `chatMessage` - Send a new chat message
  ```javascript
  socket.emit('chatMessage', { msg: 'Hello, world!' });
  ```

### Server to Client
- `message` - Receive a new chat message
  ```javascript
  socket.on('message', (message) => {
    console.log(message);
  });
  ```

## Running the Application

Start the server:
```bash
npm start
```

The application will be available at `http://localhost:8080`

## Security

- JWT authentication for both HTTP and WebSocket connections
- Password hashing (implementation required in auth routes)
- CORS and other security middleware should be added for production

## Production Considerations

1. Use environment variables for sensitive data
2. Implement proper error handling
3. Add input validation
4. Set up CORS
5. Use a production-ready MongoDB instance
6. Implement rate limiting
7. Add logging

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
 
