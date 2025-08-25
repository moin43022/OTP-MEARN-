const express = require('express');
const router = express.Router();
const Event = require('../Models/Event');

// Add new event
router.post('/add', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ msg: 'Event saved', event });
  } catch (err) {
    console.error('❌ Error saving event:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error('❌ Error fetching events:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Get the latest event
router.get('/latest', async (req, res) => {
  try {
    const event = await Event.findOne().sort({ createdAt: -1 });
    if (!event) return res.status(404).json({ msg: 'No event found' });

    // Prevent caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    res.json(event);
  } catch (err) {
    console.error('❌ Error fetching latest event:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
