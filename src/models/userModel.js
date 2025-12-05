/**
 * @fileoverview Mongoose User model definition.
 * Defines the schema and structure for user documents stored in MongoDB.
 *
 * Fields:
 *  - username: Unique username chosen by the user.
 *  - email: Unique email used for login and communication.
 *  - password: Hashed password (never stored in plain text).
 *  - role: User's role within the system (student, instructor, admin).
 *  - createdAt: Timestamp of when the account was created.
 */

const mongoose = require('mongoose');

/**
 * Mongoose schema for the User collection.
 * Defines required fields, validation rules, and defaults.
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,   // Must be provided
        unique: true      // No two users can share the same username
    },
    email: {
        type: String,
        required: true,   // Must be provided
        unique: true      // Ensures each email is unique in the database
    },
    password: {
        type: String,
        required: true    // Stores hashed password (bcrypt)
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'], // Valid role options
        default: 'student'                         // Default user role
    },
    createdAt: {
        type: Date,
        default: Date.now  // Auto-set creation date
    }
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
