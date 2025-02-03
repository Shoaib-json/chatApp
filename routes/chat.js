const express = require('express');
const router = express.Router();
const passport = require('passport');
const Chat = require('../models/chat');

// Fetch the latest 50 chat messages (JWT authentication required)
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Retrieve messages sorted by creation time (oldest to newest)
    const messages = await Chat.find().sort({ created_at: 1 }).limit(50).lean();
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).send('Something went wrong. Please try again later.');
  }
});

module.exports = router;
