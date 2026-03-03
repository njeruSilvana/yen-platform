// server/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User.model');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ 
        success: false,
        error: 'Please provide all required fields: name, email, password, and role' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        error: 'User with this email already exists' 
      });
    }

    // Validate role
    const validRoles = ['entrepreneur', 'investor', 'mentor'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid role. Must be entrepreneur, investor, or mentor' 
      });
    }

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role
    });

    await user.save();

    // Return user data (without password)
    const userData = user.toPublicJSON();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userData
    });

  } catch (error) {
    console.error('Register error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        error: messages.join(', ') 
      });
    }

    res.status(500).json({ 
      success: false,
      error: 'Server error during registration' 
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Please provide email and password' 
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid email or password' 
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid email or password' 
      });
    }

    // Return user data (without password)
    const userData = user.toPublicJSON();

    res.json({
      success: true,
      message: 'Login successful',
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error during login' 
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private (would need auth middleware)
router.get('/me', async (req, res) => {
  try {
    // For now, return a message
    // In production, you'd use JWT middleware to get userId
    res.json({
      success: true,
      message: 'Auth middleware not implemented yet'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Server error' 
    });
  }
});

module.exports = router;