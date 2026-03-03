// server/models/User.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['entrepreneur', 'investor', 'mentor'],
    required: [true, 'Role is required'],
    default: 'entrepreneur'
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    default: ''
  },
  location: {
    type: String,
    maxlength: [100, 'Location cannot exceed 100 characters'],
    default: ''
  },
  website: {
    type: String,
    maxlength: [200, 'Website URL cannot exceed 200 characters'],
    default: ''
  },
  company: {
    type: String,
    maxlength: [100, 'Company name cannot exceed 100 characters'],
    default: ''
  },

  // ── Mentor-specific fields ──────────────────────────────────────────────────
  expertise: {
    type: String,
    maxlength: [100, 'Expertise cannot exceed 100 characters'],
    default: ''
  },
  experience: {
    type: String,
    maxlength: [50, 'Experience cannot exceed 50 characters'],
    default: ''
    // e.g. "8+ Years", "5 Years", "10+ Years"
  },

  // ── Investor-specific fields ────────────────────────────────────────────────
  investmentRange: {
    type: String,
    maxlength: [50, 'Investment range cannot exceed 50 characters'],
    default: ''
    // e.g. "$10K – $100K", "$50K – $500K"
  },
  investmentFocus: {
    type: String,
    maxlength: [100, 'Investment focus cannot exceed 100 characters'],
    default: ''
    // e.g. "Seed Stage", "Early Stage", "Series A"
  },
  investorType: {
    type: String,
    maxlength: [50, 'Investor type cannot exceed 50 characters'],
    default: ''
    // e.g. "Angel Investor", "VC Partner", "Fund Manager"
  },

  verified: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Public profile (no password)
userSchema.methods.toPublicJSON = function() {
  return {
    id:              this._id,
    name:            this.name,
    email:           this.email,
    role:            this.role,
    bio:             this.bio,
    location:        this.location,
    website:         this.website,
    company:         this.company,
    expertise:       this.expertise,
    experience:      this.experience,
    investmentRange: this.investmentRange,
    investmentFocus: this.investmentFocus,
    investorType:    this.investorType,
    verified:        this.verified,
    createdAt:       this.createdAt
  };
};

module.exports = mongoose.model('User', userSchema);