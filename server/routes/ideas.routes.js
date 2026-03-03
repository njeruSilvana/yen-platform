const express = require('express');
const router = express.Router();
const {
  getIdeas,
  getIdea,
  createIdea,
  updateIdea,
  deleteIdea,
  likeIdea,
  getUserIdeas,
  getTrendingIdeas,
} = require('../controllers/ideas.controller');

// ── CRITICAL: specific string routes MUST come before /:id ───────────────────
// If /:id is first, Express treats "trending" and "user" as idea IDs → 404/wrong result

router.get('/trending',     getTrendingIdeas);   // GET /api/ideas/trending
router.get('/user/:userId', getUserIdeas);        // GET /api/ideas/user/:userId  ← dashboard uses this

// ── General CRUD ──────────────────────────────────────────────────────────────
router.get('/',      getIdeas);       // GET    /api/ideas
router.get('/:id',   getIdea);        // GET    /api/ideas/:id
router.post('/',     createIdea);     // POST   /api/ideas
router.put('/:id',   updateIdea);     // PUT    /api/ideas/:id
router.delete('/:id', deleteIdea);   // DELETE /api/ideas/:id

// ── Like ──────────────────────────────────────────────────────────────────────
// Your controller checks req.method isn't relevant here but note:
// lib/api.ts was calling this with method: 'POST' — fixed below in api.ts.
// The controller uses PUT so we register PUT here.
router.put('/:id/like', likeIdea);    // PUT    /api/ideas/:id/like

module.exports = router;