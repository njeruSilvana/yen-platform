const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMentors,
  getInvestors,
  getEntrepreneurs,
} = require('../controllers/users.controller');

// ── IMPORTANT: named sub-routes MUST be registered before /:id ────────────────
// If /:id came first, Express would treat the string "mentors" as a user id.
router.get('/mentors',       getMentors);
router.get('/investors',     getInvestors);
router.get('/entrepreneurs', getEntrepreneurs);

// ── General CRUD ──────────────────────────────────────────────────────────────
router.get('/',      getUsers);
router.get('/:id',   getUser);
router.put('/:id',   updateUser);
router.delete('/:id', deleteUser);

module.exports = router;