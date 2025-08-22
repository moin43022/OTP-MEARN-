const Event = require('../Models/Event');

const addEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ msg: 'Event saved', event });
  } catch (err) {
    console.error('❌ Error saving event:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (err) {
    console.error('❌ Error fetching events:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { addEvent, getAllEvents };
