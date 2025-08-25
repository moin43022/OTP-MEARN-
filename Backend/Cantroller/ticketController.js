const Ticket = require('../Models/Ticket');

const bookTickets = async (req, res) => {
  const { phone, names, time, location, price, date, capacity } = req.body;

  if (!phone || !Array.isArray(names) || names.length === 0) {
    return res.status(400).json({ msg: 'Invalid data' });
  }

  try {
    const existingCount = await Ticket.countDocuments();

    if (capacity && existingCount + names.length > capacity) {
      return res.status(400).json({ msg: 'Event capacity is Full' });
    }

    const tickets = await Promise.all(
      names.map(async (name, index) => {
       const digits = capacity.toString().length;
       const tokenNumber = `TKN${(existingCount + index + 1).toString().padStart(digits, '0')}`;


        const ticket = new Ticket({
          phone,
          name,
          time,
          location,
          price,
          date,
          tokenNumber,
        });

        return await ticket.save();
      })
    );

    return res.status(200).json({ msg: 'Tickets booked', tickets });
  } catch (err) {
    console.error('❌ Error booking tickets:', err);
    return res.status(500).json({ msg: 'Server error while booking tickets' });
  }
};
// 📌 6. Check Capacity Status
const checkCapacity = async (req, res) => {
  let { capacity } = req.query;

  if (!capacity) {
    return res.status(400).json({ msg: 'Capacity value required' });
  }

  capacity = parseInt(capacity, 10); // ✅ convert to number

  try {
    const existingCount = await Ticket.countDocuments();

    if (existingCount >= capacity) {
      return res.status(200).json({
        capacityFull: true,
        currentCount: existingCount,
        capacity
      });
    } else {
      return res.status(200).json({
        capacityFull: false,
        currentCount: existingCount,
        capacity
      });
    }
  } catch (err) {
    console.error('❌ Error checking capacity:', err);
    res.status(500).json({ msg: 'Server error while checking capacity' });
  }
};


// 📌 2. Get All Tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ bookedAt: 1 });
    res.status(200).json(tickets);
  } catch (err) {
    console.error('❌ Error fetching all tickets:', err);
    res.status(500).json({ msg: 'Server error while fetching tickets' });
  }
};

// 📌 3. Get Tickets by Phone
const getTicketsByPhone = async (req, res) => {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ msg: 'Phone number required' });
  }

  try {
    const tickets = await Ticket.find({ phone });
    res.status(200).json(tickets);
  } catch (err) {
    console.error('❌ Error fetching tickets by phone:', err);
    res.status(500).json({ msg: 'Server error while fetching user tickets' });
  }
};

// 📌 4. Get Latest Ticket
const getLatestTicket = async (req, res) => {
  try {
    const latestTicket = await Ticket.findOne().sort({ bookedAt: -1 });
    res.status(200).json(latestTicket || {});
  } catch (err) {
    console.error('❌ Error fetching latest ticket:', err);
    res.status(500).json({ msg: 'Server error while fetching latest ticket' });
  }
};

// 📌 5. Delete All Tickets
const deleteAllTickets = async (req, res) => {
  try {
    await Ticket.deleteMany({});
    res.status(200).json({ msg: 'All tickets deleted successfully' });
  } catch (err) {
    console.error('❌ Error clearing tickets:', err);
    res.status(500).json({ msg: 'Server error while clearing tickets' });
  }
};

module.exports = {
  bookTickets,
  getAllTickets,
  getTicketsByPhone,
  getLatestTicket,
  deleteAllTickets,
  checkCapacity,
};
