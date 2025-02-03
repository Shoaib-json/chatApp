// models/Chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  from: { 
    type: String, required: true
   },
  msg: { 
    type: String, required: true, maxLength: 1000 
  },
  created_at: {
     type: Date, default: Date.now 
    }
});

module.exports = mongoose.model('Chat', chatSchema);
