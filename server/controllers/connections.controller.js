// server/controllers/connections.controller.js
const Connection = require('../models/Connection.model');
const User = require('../models/User.model');

/**
 * @desc    Get all connections for a user
 * @route   GET /api/connections
 * @access  Private
 */
exports.getConnections = async (req, res, next) => {
  try {
    const { userId, status } = req.query;
    const queryUserId = req.user ? req.user.id : userId;

    if (!queryUserId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    // Build filter
    const filter = {
      $or: [
        { fromUserId: queryUserId },
        { toUserId: queryUserId }
      ]
    };

    if (status) filter.status = status;

    const connections = await Connection.find(filter)
      .populate('fromUserId', 'name email role verified')
      .populate('toUserId', 'name email role verified')
      .sort({ createdAt: -1 })
      .lean();

    res.json(connections);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single connection
 * @route   GET /api/connections/:id
 * @access  Private
 */
exports.getConnection = async (req, res, next) => {
  try {
    const connection = await Connection.findById(req.params.id)
      .populate('fromUserId', 'name email role bio location verified')
      .populate('toUserId', 'name email role bio location verified')
      .lean();

    if (!connection) {
      return res.status(404).json({
        success: false,
        error: 'Connection not found'
      });
    }

    res.json({
      success: true,
      connection
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create connection request
 * @route   POST /api/connections
 * @access  Private
 */
exports.createConnection = async (req, res, next) => {
  try {
    const { fromUserId, toUserId, type, message } = req.body;

    // Use authenticated user if available
    const requesterUserId = req.user ? req.user.id : fromUserId;

    if (!toUserId) {
      return res.status(400).json({
        success: false,
        error: 'Target user ID is required'
      });
    }

    // Prevent self-connection
    if (requesterUserId === toUserId) {
      return res.status(400).json({
        success: false,
        error: 'Cannot connect with yourself'
      });
    }

    // Check if users exist
    const [fromUser, toUser] = await Promise.all([
      User.findById(requesterUserId),
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
        { fromUserId: requesterUserId, toUserId },
        { fromUserId: toUserId, toUserId: requesterUserId }
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
    const connection = await Connection.create({
      fromUserId: requesterUserId,
      toUserId,
      type: type || 'peer',
      message: message || ''
    });

    await connection.populate([
      { path: 'fromUserId', select: 'name email role verified' },
      { path: 'toUserId', select: 'name email role verified' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Connection request sent successfully',
      connection
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update connection status
 * @route   PUT /api/connections/:id
 * @access  Private (receiver only)
 */
exports.updateConnection = async (req, res, next) => {
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

    // Check if user is the receiver (if using auth middleware)
    if (req.user && connection.toUserId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this connection'
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
      { path: 'fromUserId', select: 'name email role verified' },
      { path: 'toUserId', select: 'name email role verified' }
    ]);

    res.json({
      success: true,
      message: `Connection ${status}`,
      connection
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete connection
 * @route   DELETE /api/connections/:id
 * @access  Private (both parties)
 */
exports.deleteConnection = async (req, res, next) => {
  try {
    const connection = await Connection.findById(req.params.id);

    if (!connection) {
      return res.status(404).json({
        success: false,
        error: 'Connection not found'
      });
    }

    // Check if user is part of the connection (if using auth middleware)
    if (req.user) {
      const isPartOfConnection =
        connection.fromUserId.toString() === req.user.id ||
        connection.toUserId.toString() === req.user.id;

      if (!isPartOfConnection) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to delete this connection'
        });
      }
    }

    await connection.deleteOne();

    res.json({
      success: true,
      message: 'Connection deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get pending connection requests
 * @route   GET /api/connections/pending
 * @access  Private
 */
exports.getPendingRequests = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : req.query.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    // Get connections where user is receiver and status is pending
    const pendingRequests = await Connection.find({
      toUserId: userId,
      status: 'pending'
    })
      .populate('fromUserId', 'name email role bio location verified')
      .sort({ createdAt: -1 })
      .lean();

    res.json(pendingRequests);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get accepted connections
 * @route   GET /api/connections/accepted
 * @access  Private
 */
exports.getAcceptedConnections = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : req.query.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const connections = await Connection.find({
      $or: [
        { fromUserId: userId },
        { toUserId: userId }
      ],
      status: 'accepted'
    })
      .populate('fromUserId', 'name email role verified')
      .populate('toUserId', 'name email role verified')
      .sort({ createdAt: -1 })
      .lean();

    res.json(connections);
  } catch (error) {
    next(error);
  }
};
