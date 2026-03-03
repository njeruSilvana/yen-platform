// server/middleware/validation.middleware.js

/**
 * Validate registration data
 */
const validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;
  const errors = [];

  // Name validation
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (name && name.length > 100) {
    errors.push('Name cannot exceed 100 characters');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Please provide a valid email address');
  }

  // Password validation
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  if (password && password.length > 128) {
    errors.push('Password is too long');
  }

  // Role validation
  const validRoles = ['entrepreneur', 'investor', 'mentor'];
  if (!role || !validRoles.includes(role)) {
    errors.push('Role must be entrepreneur, investor, or mentor');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join('. ')
    });
  }

  next();
};

/**
 * Validate login data
 */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push('Email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join('. ')
    });
  }

  next();
};

/**
 * Validate idea creation
 */
const validateIdea = (req, res, next) => {
  const { title, description, category, fundingGoal } = req.body;
  const errors = [];

  // Title validation
  if (!title || title.trim().length < 5) {
    errors.push('Title must be at least 5 characters');
  }
  if (title && title.length > 200) {
    errors.push('Title cannot exceed 200 characters');
  }

  // Description validation
  if (!description || description.trim().length < 100) {
    errors.push('Description must be at least 100 characters');
  }
  if (description && description.length > 5000) {
    errors.push('Description cannot exceed 5000 characters');
  }

  // Category validation
  const validCategories = [
    'Technology',
    'Agriculture',
    'Healthcare',
    'Education',
    'Finance',
    'E-commerce',
    'Sustainability'
  ];
  if (!category || !validCategories.includes(category)) {
    errors.push(`Category must be one of: ${validCategories.join(', ')}`);
  }

  // Funding goal validation
  if (!fundingGoal || isNaN(fundingGoal)) {
    errors.push('Funding goal must be a valid number');
  }
  if (fundingGoal && (fundingGoal < 100 || fundingGoal > 10000000)) {
    errors.push('Funding goal must be between $100 and $10,000,000');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join('. ')
    });
  }

  next();
};

/**
 * Validate connection request
 */
const validateConnection = (req, res, next) => {
  const { fromUserId, toUserId, type } = req.body;
  const errors = [];

  if (!fromUserId) {
    errors.push('From user ID is required');
  }

  if (!toUserId) {
    errors.push('To user ID is required');
  }

  if (fromUserId && toUserId && fromUserId === toUserId) {
    errors.push('Cannot connect with yourself');
  }

  const validTypes = ['mentor', 'investor', 'peer'];
  if (!type || !validTypes.includes(type)) {
    errors.push('Type must be mentor, investor, or peer');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join('. ')
    });
  }

  next();
};

/**
 * Sanitize input - remove dangerous characters
 */
const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        // Remove script tags and potentially dangerous content
        obj[key] = obj[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '')
          .trim();
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateIdea,
  validateConnection,
  sanitizeInput
};