const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ticketRoutes = require('./Routes/ticketRoutes');
const eventRoutes = require('./routes/event');

const app = express();

// ✅ Apply CORS before routes
app.use(cors({
  origin: '*', // allow all devices on your network
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Increase JSON & URL-encoded body size limit
app.use(express.json({ limit: '10mb' }));  
app.use(express.urlencoded({ limit: '10mb', extended: true }));  

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/eventApp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('❌ Mongo error:', err));

// ✅ Mount routes AFTER middleware
app.use('/api/events', eventRoutes);
app.use('/api', ticketRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
