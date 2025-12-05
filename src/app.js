/**
 * @fileoverview Main application entry point.
 * Loads environment variables, initializes the Express server,
 * connects to the MongoDB database, registers routes, and starts the server.
 */

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const initServer = require('./config/server');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./utils/errorHandler');

// Initialize Express application with configured middlewares
const app = initServer();

// Connect to MongoDB database
connectDB();

/**
 * Register API routes.
 * All user-related routes will be prefixed with /api/users.
 */
app.use('/api/users', userRoutes);

// Global error-handling middleware (should be last)
app.use(errorHandler);

// Define the port number (fallback to 3000 if not provided)
const PORT = process.env.PORT || 3000;

/**
 * Start the server and listen for incoming requests.
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
