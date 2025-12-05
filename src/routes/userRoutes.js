/**
 * @fileoverview Routes for user authentication (register & login).
 * This router exposes two endpoints:
 *   POST /register – Creates a new user
 *   POST /login    – Authenticates user and returns a JWT
 */

const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

/**
 * @route POST /register
 * @desc Register a new user
 * @access Public
 *
 * Expects:
 *   - username
 *   - email
 *   - password
 */
router.post('/register', registerUser);

/**
 * @route POST /login
 * @desc Logs in a user and returns a JWT token
 * @access Public
 *
 * Expects:
 *   - email
 *   - password
 */
router.post('/login', loginUser);

module.exports = router;
