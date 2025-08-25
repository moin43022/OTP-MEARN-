const express = require('express');
const router = express.Router();
const {
  bookTickets,
  getAllTickets,
  getTicketsByPhone,
  getLatestTicket,
  deleteAllTickets,
  checkCapacity,
} = require('../Cantroller/ticketController');

// Routes (all lowercase, clean & RESTful)
router.post('/tickets/book', bookTickets);
router.get('/tickets', getAllTickets);
router.get('/tickets/by-phone', getTicketsByPhone);
router.get('/tickets/latest', getLatestTicket);
router.delete('/tickets/clear', deleteAllTickets);
router.get('/tickets/check-capacity', checkCapacity);

module.exports = router;
