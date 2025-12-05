/**
 * @fileoverview User service helper functions.
 * Contains utilities for retrieving user information from the database.
 */

const User = require('../models/userModel');

/**
 * Finds a user in the database by their MongoDB ObjectId.
 *
 * @async
 * @function findUserById
 * @param {string} userId - The ID of the user to look up.
 * @returns {Promise<Object|null>} The user document if found, otherwise null.
 *
 * @example
 * const user = await findUserById('654af2e1b2...'); 
 */
exports.findUserById = async (userId) => {
    // Use Mongoose's built-in findById method
    return await User.findById(userId);
};
