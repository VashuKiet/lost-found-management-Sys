const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  User_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ItemName: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    enum: ['Lost', 'Found'],
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now
  },
  ContactInfo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Item', itemSchema);
