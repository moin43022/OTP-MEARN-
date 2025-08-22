const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: String,
  name: String,
  artist: String,
  capacity: Number,
  location: String,
  info: String,
  time: String,
  time2: String,
  ticket: String,
  deadline: String,
  image1: String,
  image2: String
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema); // ✅ must be this
