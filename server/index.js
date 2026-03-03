const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ── MongoDB ───────────────────────────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yen-platform';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch((err) => {
  console.error('❌ MongoDB Connection Error:', err);
  process.exit(1);
});

// ── Import Routes ─────────────────────────────────────────────────────────────
const authRoutes        = require('./routes/auth.routes');
const ideasRoutes       = require('./routes/ideas.routes');
const connectionsRoutes = require('./routes/connections.routes');
const usersRoutes       = require('./routes/users.routes');

// ── Import controllers for top-level shortcut routes ─────────────────────────
const { getMentors, getInvestors } = require('./controllers/users.controller');

// ── Mount Routes ──────────────────────────────────────────────────────────────
app.use('/api/auth',        authRoutes);
app.use('/api/ideas',       ideasRoutes);
app.use('/api/connections', connectionsRoutes);
app.use('/api/users',       usersRoutes);

// ── Top-level mentor/investor shortcuts ───────────────────────────────────────
// Your frontend fetches /api/mentors and /api/investors directly.
// We register them as plain route handlers, NOT by re-mounting the whole router.
// The controller already filters by role: 'mentor' / role: 'investor'.
app.get('/api/mentors',   getMentors);
app.get('/api/investors', getInvestors);

// ── Health / Root ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'YEN Platform API is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to YEN Platform API',
    version: '1.0.0',
    endpoints: {
      health:      '/api/health',
      auth:        '/api/auth',
      ideas:       '/api/ideas',
      connections: '/api/connections',
      users:       '/api/users',
      mentors:     '/api/mentors',
      investors:   '/api/investors',
    },
  });
});

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;