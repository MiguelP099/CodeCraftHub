/**
 * @fileoverview Global error-handling middleware.
 * Captures any unhandled errors in the request pipeline,
 * logs them using the application's logger, and returns
 * a generic response to the client.
 */

const logger = require('./logger');

/**
 * Express error-handling middleware.
 *
 * This middleware is automatically triggered when an error
 * is passed to `next(err)` anywhere in the application.
 *
 * Steps:
 *  1. Log the error using the centralized logger.
 *  2. Return a generic 500 Internal Server Error response.
 *
 * @function errorHandler
 * @param {Error} err - The error object passed from upstream middleware.
 * @param {object} req - Express Request object.
 * @param {object} res - Express Response object.
 * @param {function} next - Next middleware function (unused).
 */
const errorHandler = (err, req, res, next) => {

    // Log the full error object for debugging
    logger.error(err);

    // Respond with a generic message to avoid exposing server internals
    res.status(500).json({ error: 'Something went wrong.' });
};

module.exports = errorHandler;
