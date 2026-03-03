// server/models/Connection.model.js
const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'From user ID is required']
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'To user ID is required']
  },
  type: {
    type: String,
    enum: ['mentor', 'investor', 'peer'],
    required: [true, 'Connection type is required']
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot exceed 500 characters'],
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
connectionSchema.index({ fromUserId: 1, toUserId: 1 });
connectionSchema.index({ toUserId: 1, status: 1 });
connectionSchema.index({ fromUserId: 1, status: 1 });

// Prevent duplicate connections
connectionSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

module.exports = mongoose.model('Connection', connectionSchema);