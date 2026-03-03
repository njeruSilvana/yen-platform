// server/controllers/ideas.controller.js
const Idea = require('../models/Idea.model');
const User = require('../models/User.model');

/**
 * @desc    Get all ideas
 * @route   GET /api/ideas
 * @access  Public
 */
exports.getIdeas = async (req, res, next) => {
  try {
    const { category, userId, status, sort, limit = 50 } = req.query;

    // Build filter
    const filter = {};
    if (category && category !== 'all') filter.category = category;
    if (userId) filter.userId = userId;
    if (status) filter.status = status;
    else filter.status = 'active';

    // Build sort
    let sortBy = { createdAt: -1 }; // Default: newest first
    if (sort === 'likes') sortBy = { likes: -1 };
    if (sort === 'funding') sortBy = { currentFunding: -1 };

    const ideas = await Idea.find(filter)
      .populate('userId', 'name email role verified')
      .sort(sortBy)
      .limit(parseInt(limit))
      .lean();

    res.json(ideas);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single idea
 * @route   GET /api/ideas/:id
 * @access  Public
 */
exports.getIdea = async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id)
      .populate('userId', 'name email role bio location company website verified')
      .lean();

    if (!idea) {
      return res.status(404).json({
        success: false,
        error: 'Idea not found'
      });
    }

    res.json({
      success: true,
      idea
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new idea
 * @route   POST /api/ideas
 * @access  Private (entrepreneur only)
 */
exports.createIdea = async (req, res, next) => {
  try {
    const { userId, title, description, category, fundingGoal } = req.body;

    // If using auth middleware, use req.user.id instead of userId from body
    const creatorId = req.user ? req.user.id : userId;

    // Verify user exists and is entrepreneur
    const user = await User.findById(creatorId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (user.role !== 'entrepreneur') {
      return res.status(403).json({
        success: false,
        error: 'Only entrepreneurs can pitch ideas'
      });
    }

    // Create idea
    const idea = await Idea.create({
      userId: creatorId,
      title: title.trim(),
      description: description.trim(),
      category,
      fundingGoal: parseFloat(fundingGoal)
    });

    await idea.populate('userId', 'name email role');

    res.status(201).json({
      success: true,
      message: 'Idea created successfully',
      idea
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update idea
 * @route   PUT /api/ideas/:id
 * @access  Private (owner only)
 */
exports.updateIdea = async (req, res, next) => {
  try {
    let idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        error: 'Idea not found'
      });
    }

    // Check ownership (if using auth middleware)
    if (req.user && idea.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this idea'
      });
    }

    // Update allowed fields
    const { title, description, category, fundingGoal, currentFunding, status } = req.body;

    if (title) idea.title = title.trim();
    if (description) idea.description = description.trim();
    if (category) idea.category = category;
    if (fundingGoal) idea.fundingGoal = parseFloat(fundingGoal);
    if (currentFunding !== undefined) idea.currentFunding = parseFloat(currentFunding);
    if (status) idea.status = status;

    await idea.save();
    await idea.populate('userId', 'name email role');

    res.json({
      success: true,
      message: 'Idea updated successfully',
      idea
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete idea
 * @route   DELETE /api/ideas/:id
 * @access  Private (owner only)
 */
exports.deleteIdea = async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        error: 'Idea not found'
      });
    }

    // Check ownership (if using auth middleware)
    if (req.user && idea.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this idea'
      });
    }

    await idea.deleteOne();

    res.json({
      success: true,
      message: 'Idea deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Like/unlike idea
 * @route   PUT /api/ideas/:id/like
 * @access  Public (should be private)
 */
exports.likeIdea = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const likerUserId = req.user ? req.user.id : userId;

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        error: 'Idea not found'
      });
    }

    // Check if already liked
    const alreadyLiked = idea.likedBy.includes(likerUserId);

    if (alreadyLiked) {
      // Unlike
      idea.likedBy = idea.likedBy.filter(id => id.toString() !== likerUserId);
      idea.likes = Math.max(0, idea.likes - 1);
    } else {
      // Like
      idea.likedBy.push(likerUserId);
      idea.likes += 1;
    }

    await idea.save();

    res.json({
      success: true,
      message: alreadyLiked ? 'Idea unliked' : 'Idea liked',
      likes: idea.likes,
      liked: !alreadyLiked
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's ideas
 * @route   GET /api/ideas/user/:userId
 * @access  Public
 */
exports.getUserIdeas = async (req, res, next) => {
  try {
    const ideas = await Idea.find({ userId: req.params.userId })
      .populate('userId', 'name email role')
      .sort({ createdAt: -1 })
      .lean();

    res.json(ideas);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get trending ideas (most likes)
 * @route   GET /api/ideas/trending
 * @access  Public
 */
exports.getTrendingIdeas = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    const ideas = await Idea.find({ status: 'active' })
      .populate('userId', 'name email role verified')
      .sort({ likes: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .lean();

    res.json(ideas);
  } catch (error) {
    next(error);
  }
};

