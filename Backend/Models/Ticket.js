const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  name: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  date: { type: String, required: true },
  bookedAt: { type: Date, default: Date.now },
  tokenNumber: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('UserData', ticketSchema);
