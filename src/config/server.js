/**
 * @fileoverview Express server initialization.
 * This module creates and configures an Express application with common
 * middlewares such as CORS support, JSON parsing, and a request logger.
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

/**
 * Initializes and configures an Express application.
 *
 * This function:
 *  - Creates a new Express app instance.
 *  - Adds a simple logger to print incoming requests.
 *  - Enables Cross-Origin Resource Sharing (CORS).
 *  - Enables JSON body parsing for incoming requests.
 *
 * @function initServer
 * @returns {object} Configured Express application instance.
 */
const initServer = () => {
    const app = express();

    /**
     * Request Logger Middleware
     * Logs the HTTP method and URL of each incoming request.
     */
    app.use((req, res, next) => {
        console.log("Request received:", req.method, req.url);
        next();
    });

    // Enable CORS to allow requests from external clients (frontend, mobile, etc.)
    app.use(cors());

    // Parse incoming JSON payloads into `req.body`
    app.use(bodyParser.json());

    return app;
};

module.exports = initServer;
