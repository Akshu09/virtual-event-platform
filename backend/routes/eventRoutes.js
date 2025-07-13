const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authMiddleware');
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  registerForEvent,
} = require('../controllers/eventController');

// Public: View all events
router.get('/', getEvents);

// Protected: Organizer creates event
router.post('/', authenticateToken, createEvent);

// Protected: Organizer updates or deletes their event
router.put('/:id', authenticateToken, updateEvent);
router.delete('/:id', authenticateToken, deleteEvent);

// Protected: User registers for an event
router.post('/:id/register', authenticateToken, registerForEvent);

module.exports = router;
