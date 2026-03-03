// server/controllers/users.controller.js
const User = require('../models/User.model');
const Idea = require('../models/Idea.model');
const Connection = require('../models/Connection.model');

// ── Format a MongoDB user doc for API responses (_id → id, include all fields) ─
function formatUser(user) {
  return {
    id:              user._id.toString(),
    name:            user.name,
    email:           user.email,
    role:            user.role,
    bio:             user.bio             || '',
    location:        user.location        || '',
    company:         user.company         || '',
    website:         user.website         || '',
    // Mentor fields
    expertise:       user.expertise       || '',
    experience:      user.experience      || '',
    // Investor fields
    investmentRange: user.investmentRange || '',
    investmentFocus: user.investmentFocus || '',
    investorType:    user.investorType    || '',
    verified:        user.verified        || false,
    createdAt:       user.createdAt,
  };
}

/**
 * @desc    Get all users (with optional ?role= and ?search= filters)
 * @route   GET /api/users
 */
exports.getUsers = async (req, res, next) => {
  try {
    const { role, search, limit = 50 } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name:  { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    const users = await User.find(filter)
      .select('-password')
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .lean();
    res.json(users.map(formatUser));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single user with stats
 * @route   GET /api/users/:id
 */
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password').lean();
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    const [ideasCount, connectionsCount, totalLikesResult] = await Promise.all([
      Idea.countDocuments({ userId: user._id }),
      Connection.countDocuments({
        $or: [{ fromUserId: user._id }, { toUserId: user._id }],
        status: 'accepted',
      }),
      Idea.aggregate([
        { $match: { userId: user._id } },
        { $group: { _id: null, total: { $sum: '$likes' } } },
      ]),
    ]);
    res.json({
      success: true,
      user: {
        ...formatUser(user),
        stats: {
          ideas:       ideasCount,
          connections: connectionsCount,
          totalLikes:  totalLikesResult[0]?.total || 0,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile (includes mentor/investor specific fields)
 * @route   PUT /api/users/:id
 */
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    if (req.user && req.user.id !== req.params.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to update this profile' });
    }

    // Common fields
    const { name, bio, location, website, company } = req.body;
    if (name     !== undefined) user.name     = name.trim();
    if (bio      !== undefined) user.bio      = bio;
    if (location !== undefined) user.location = location;
    if (website  !== undefined) user.website  = website;
    if (company  !== undefined) user.company  = company;

    // Mentor-specific fields
    const { expertise, experience } = req.body;
    if (expertise  !== undefined) user.expertise  = expertise;
    if (experience !== undefined) user.experience = experience;

    // Investor-specific fields
    const { investmentRange, investmentFocus, investorType } = req.body;
    if (investmentRange !== undefined) user.investmentRange = investmentRange;
    if (investmentFocus !== undefined) user.investmentFocus = investmentFocus;
    if (investorType    !== undefined) user.investorType    = investorType;

    await user.save();
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: user.toPublicJSON(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    if (req.user && req.user.id !== req.params.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to delete this account' });
    }
    await Promise.all([
      Idea.deleteMany({ userId: user._id }),
      Connection.deleteMany({ $or: [{ fromUserId: user._id }, { toUserId: user._id }] }),
    ]);
    await user.deleteOne();
    res.json({ success: true, message: 'User account deleted successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get users with role 'mentor'
 * @route   GET /api/mentors  +  GET /api/users/mentors
 */
exports.getMentors = async (req, res, next) => {
  try {
    const { limit = 50, verified } = req.query;
    const filter = { role: 'mentor' };
    if (verified === 'true') filter.verified = true;
    const mentors = await User.find(filter)
      .select('-password')
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .lean();
    res.json(mentors.map(formatUser));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get users with role 'investor'
 * @route   GET /api/investors  +  GET /api/users/investors
 */
exports.getInvestors = async (req, res, next) => {
  try {
    const { limit = 50, verified } = req.query;
    const filter = { role: 'investor' };
    if (verified === 'true') filter.verified = true;
    const investors = await User.find(filter)
      .select('-password')
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .lean();
    res.json(investors.map(formatUser));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get users with role 'entrepreneur'
 * @route   GET /api/entrepreneurs  +  GET /api/users/entrepreneurs
 */
exports.getEntrepreneurs = async (req, res, next) => {
  try {
    const { limit = 50 } = req.query;
    const entrepreneurs = await User.find({ role: 'entrepreneur' })
      .select('-password')
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .lean();
    res.json(entrepreneurs.map(formatUser));
  } catch (error) {
    next(error);
  }
};