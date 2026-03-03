// server/routes/connections.routes.js
const express = require('express');
const router = express.Router();
const Connection = require('../models/Connection.model');
const User = require('../models/User.model');

// @route   GET /api/connections
// @desc    Get all connections for a user
// @access  Public (should be private)
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ 
        success: false,
        error: 'User ID is required' 
      });
    }

    // Get connections where user is sender or receiver
    const connections = await Connection.find({
      $or: [
        { fromUserId: userId },
        { toUserId: userId }
      ]
    })
    .populate('fromUserId', 'name email role')
    .populate('toUserId', 'name email role')
    .sort({ createdAt: -1 })
    .lean();

    // Format response
    const formattedConnections = connections.map(conn => ({
      id: conn._id,
      type: conn.type,
      status: conn.status,
      message: conn.message,
      createdAt: conn.createdAt,
      // Determine if current user is sender or receiver
      fromUser: {
        id: conn.fromUserId._id,
        name: conn.fromUserId.name,
        email: conn.fromUserId.email,
        role: conn.fromUserId.role
      },
      toUser: {
        id: conn.toUserId._id,
        name: conn.toUserId.name,
        email: conn.toUserId.email,
        role: conn.toUserId.role
      },
      // For easier frontend handling
      isCurrentUserSender: conn.fromUserId._id.toString() === userId
    }));

    res.json(formattedConnections);

  } catch (error) {
    console.error('Get connections error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching connections' 
    });
  }
});

// @route   POST /api/connections
// @desc    Create new connection request
// @access  Public (should be private)
router.post('/', async (req, res) => {
  try {
    const { fromUserId, toUserId, type, message } = req.body;

    // Validation
    if (!fromUserId || !toUserId || !type) {
      return res.status(400).json({ 
        success: false,
        error: 'Please provide fromUserId, toUserId, and type' 
      });
    }

    // Prevent self-connection
    if (fromUserId === toUserId) {
      return res.status(400).json({ 
        success: false,
        error: 'Cannot connect with yourself' 
      });
    }

    // Check if users exist
    const [fromUser, toUser] = await Promise.all([
      User.findById(fromUserId),
      User.findById(toUserId)
    ]);

    if (!fromUser || !toUser) {
      return res.status(404).json({ 
        success: false,
        error: 'One or both users not found' 
      });
    }

    // Check for existing connection
    const existingConnection = await Connection.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    });

    if (existingConnection) {
      return res.status(400).json({ 
        success: false,
        error: 'Connection already exists',
        connection: existingConnection
      });
    }

    // Create connection
    const connection = new Connection({
      fromUserId,
      toUserId,
      type,
      message: message || ''
    });

    await connection.save();

    // Populate user data
    await connection.populate([
      { path: 'fromUserId', select: 'name email role' },
      { path: 'toUserId', select: 'name email role' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Connection request sent successfully',
      connection: {
        id: connection._id,
        type: connection.type,
        status: connection.status,
        fromUser: {
          id: connection.fromUserId._id,
          name: connection.fromUserId.name,
          role: connection.fromUserId.role
        },
        toUser: {
          id: connection.toUserId._id,
          name: connection.toUserId.name,
          role: connection.toUserId.role
        },
        createdAt: connection.createdAt
      }
    });

  } catch (error) {
    console.error('Create connection error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false,
        error: 'Connection already exists' 
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        error: messages.join(', ') 
      });
    }

    res.status(500).json({ 
      success: false,
      error: 'Error creating connection' 
    });
  }
});

// @route   PUT /api/connections/:id
// @desc    Update connection status (accept/reject)
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ 
        success: false,
        error: 'Valid status (accepted or rejected) is required' 
      });
    }

    const connection = await Connection.findById(req.params.id);
    
    if (!connection) {
      return res.status(404).json({ 
        success: false,
        error: 'Connection not found' 
      });
    }

    if (connection.status !== 'pending') {
      return res.status(400).json({ 
        success: false,
        error: `Connection already ${connection.status}` 
      });
    }

    connection.status = status;
    await connection.save();

    await connection.populate([
      { path: 'fromUserId', select: 'name email role' },
      { path: 'toUserId', select: 'name email role' }
    ]);

    res.json({
      success: true,
      message: `Connection ${status}`,
      connection
    });

  } catch (error) {
    console.error('Update connection error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error updating connection' 
    });
  }
});

// @route   DELETE /api/connections/:id
// @desc    Delete connection
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const connection = await Connection.findByIdAndDelete(req.params.id);
    
    if (!connection) {
      return res.status(404).json({ 
        success: false,
        error: 'Connection not found' 
      });
    }

    res.json({
      success: true,
      message: 'Connection deleted successfully'
    });

  } catch (error) {
    console.error('Delete connection error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error deleting connection' 
    });
  }
});

module.exports = router;
