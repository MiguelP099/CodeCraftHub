/**
 * @fileoverview User authentication controller.
 * Contains handlers for registering and logging in users.
 * Uses bcrypt for hashing passwords and JWT for authentication tokens.
 */

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Registers a new user.
 *
 * Expected body:
 *  - username: String
 *  - email: String (must be unique in DB)
 *  - password: String
 *
 * Steps performed:
 *  1. Hash the user’s password.
 *  2. Create a new user document.
 *  3. Save the user into the database.
 *  4. Return success response or error.
 *
 * @async
 * @function registerUser
 */
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the user's password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the user into the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });

    } catch (error) {
        // Something went wrong — DB error, validation, etc.
        res.status(500).json({ error: 'Registration failed.' });
    }
};

/**
 * Logs in an existing user.
 *
 * Expected body:
 *  - email: String
 *  - password: String
 *
 * Steps performed:
 *  1. Find user by email.
 *  2. Compare submitted password with stored hashed password.
 *  3. Generate a JWT token if credentials match.
 *  4. Return token or error.
 *
 * @async
 * @function loginUser
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists by email
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ error: 'User not found.' });

        // Compare raw password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ error: 'Invalid credentials.' });

        // Generate a signed JWT token with a 1-hour expiration
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'secret', // Use env secret in production
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });

    } catch (error) {
        // Errors such as DB failure or unexpected exceptions
        res.status(500).json({ error: 'Login failed.' });
    }
};
