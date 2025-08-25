const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ticketRoutes = require('./routes/ticketRoutes'); // ✅ fix case
const eventRoutes = require('./routes/event');         // ✅ fix case

const app = express();

// ✅ Apply CORS before routes
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Increase JSON & URL-encoded body size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ✅ Connect to MongoDB (use Atlas, not localhost)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo error:', err));

// ✅ Mount routes AFTER middleware
app.use('/api/events', eventRoutes);
app.use('/api', ticketRoutes);

// ❌ REMOVE app.listen()
// ✅ Instead, export app for Vercel serverless
module.exports = app;
