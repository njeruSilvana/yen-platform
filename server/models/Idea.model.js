// server/models/Idea.model.js
const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [100, 'Description must be at least 100 characters'],
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Technology', 'Agriculture', 'Healthcare', 'Education', 'Finance', 'E-commerce', 'Sustainability']
  },
  fundingGoal: {
    type: Number,
    required: [true, 'Funding goal is required'],
    min: [100, 'Funding goal must be at least $100'],
    max: [10000000, 'Funding goal cannot exceed $10,000,000']
  },
  currentFunding: {
    type: Number,
    default: 0,
    min: 0
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['draft', 'active', 'funded', 'closed'],
    default: 'active'
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

// Indexes for better query performance
ideaSchema.index({ userId: 1, createdAt: -1 });
ideaSchema.index({ category: 1 });
ideaSchema.index({ status: 1 });
ideaSchema.index({ likes: -1 }); // For leaderboard queries

// Virtual populate for user details
ideaSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

// Ensure virtuals are included in JSON
ideaSchema.set('toJSON', { virtuals: true });
ideaSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Idea', ideaSchema);