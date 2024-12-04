const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path to your User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new User({ name, email, mobile, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle duplicate errors or other issues
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ error: `${field} already exists` });
    }
    res.status(500).json({ error: 'An error occurred during registration' });
  }
});


// POST route for user login

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token if login is successful
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// Assuming you're using JWT for authentication
router.get('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.id).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching user data' });
  }
});

// This should match the API call in your frontend
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});


// PUT route for updating user profile
// PUT route for updating user profile
router.put('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const userId = decoded.id;

    const { name, email, mobile } = req.body;
    console.log("Decoded user ID:", userId);
    console.log("Received data:", { name, email, mobile });

    // Find and update user data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, mobile },
      { new: true } // Return the updated document
    ).select('-password'); // Exclude password field

    if (!updatedUser) {
      console.log("User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'An error occurred while updating profile' });
  }
});



module.exports = router;
