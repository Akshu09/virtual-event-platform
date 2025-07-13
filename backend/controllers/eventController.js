const { events, users } = require('../data/store');
const sendEmail = require('../utils/sendEmail');

exports.createEvent = (req, res) => {
  if (req.user.role !== 'organizer') {
    return res.status(403).json({ message: 'Only organizers can create events' });
  }

  const { title, date, time, description } = req.body;
  const newEvent = {
    id: events.length + 1,
    title,
    date,
    time,
    description,
    organizerId: req.user.id,
    participants: [],
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
};

exports.getEvents = (req, res) => {
  res.json(events);
};

exports.updateEvent = (req, res) => {
  const event = events.find(e => e.id == req.params.id);

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  if (event.organizerId !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized to update this event' });
  }

  Object.assign(event, req.body);
  res.json(event);
};

exports.deleteEvent = (req, res) => {
  const index = events.findIndex(
    e => e.id == req.params.id && e.organizerId === req.user.id
  );

  if (index === -1) {
    return res.status(403).json({ message: 'Unauthorized or event not found' });
  }

  events.splice(index, 1);
  res.json({ message: 'Event deleted successfully' });
};

exports.registerForEvent = async (req, res) => {
  const event = events.find(e => e.id == req.params.id);

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  if (!event.participants.includes(req.user.id)) {
    event.participants.push(req.user.id);
    const user = users.find(u => u.id === req.user.id);

    if (user) {
      await sendEmail(
        user.email,
        `Event Registration: ${event.title}`,
        'You have successfully registered!'
      );
    }
  }

  res.json({ message: 'Successfully registered for the event' });
};
