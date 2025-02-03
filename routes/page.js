// routes/page.js
const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/chat', (req, res) => {
  res.render('chat');
});

// Default route redirects to login
router.get('/', (req, res) => {
  res.redirect('/login');
});

module.exports = router;
