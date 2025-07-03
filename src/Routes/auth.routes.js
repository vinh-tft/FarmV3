const express = require('express');
const { validateLogin } = require('../validators/auth.validator');
const { login } = require('../Controllers/auth.controller');
const router = express.Router();

// POST /api/auth/login
router.post('/login', validateLogin, login);

module.exports = router;