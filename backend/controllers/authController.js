const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../data/store');
const sendEmail = require('../utils/sendEmail');


exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      role,
    };

    users.push(newUser);

    await sendEmail(email, 'Welcome to Virtual Events!', 'Thank you for registering.');

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
