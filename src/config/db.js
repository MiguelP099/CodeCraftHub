/**
 * @fileoverview MongoDB connection handler using Mongoose.
 * This module exports a function that establishes a connection
 * to a MongoDB database using the MONGO_URI defined in environment variables.
 */

const mongoose = require('mongoose');

/**
 * Connects to the MongoDB database using Mongoose.
 *
 * This function:
 *  - Reads the MongoDB URI from environment variables.
 *  - Attempts to establish a connection.
 *  - Logs a success message if connected.
 *  - Logs an error and exits the process if the connection fails.
 *
 * @async
 * @function connectDB
 */
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the provided URI.
        // The options ensure compatibility with the latest MongoDB drivers.
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,        // Allows new URL string parser
            useUnifiedTopology: true      // Uses the new server discovery engine
        });

        console.log('MongoDB connected successfully.');
    } catch (error) {
        // If the connection fails, log the error message and stop the server.
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit with failure code
    }
};

// Export the function so other files can use it
module.exports = connectDB;
