// routes/auth.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Use an environment variable for security in production
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Create a new user instance
    const user = new User({ username });

    // Register the user using passport-local-mongoose
    await User.register(user, password);

    // Create a JWT token for authentication
    const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ msg: err.message });
  }
});

// Login an existing user
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ msg: info?.message || 'Invalid credentials' });

    // Generate a JWT token if login is successful
    const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, {
      expiresIn: '1h',
    });

    res.json({ token });
  })(req, res, next);
});

module.exports = router;
