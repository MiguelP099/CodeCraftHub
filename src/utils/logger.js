/**
 * @fileoverview Centralized logger configuration using Winston.
 * This logger outputs logs to both the console and a file (error.log),
 * allowing consistent logging across the entire application.
 */

const winston = require('winston');

/**
 * Creates a Winston logger instance.
 *
 * Features:
 *  - Logs messages as JSON (useful for structured logging & monitoring).
 *  - Logs all messages of level "info" and above.
 *  - Sends "error" level logs to a dedicated file (error.log).
 *  - Outputs logs to the console for development visibility.
 *
 * Log Levels (highest to lowest severity):
 *   error → warn → info → http → verbose → debug → silly
 */
const logger = winston.createLogger({
    level: 'info',                     // Minimum level of logs to capture
    format: winston.format.json(),     // Format logs as JSON objects
    transports: [
        // Writes error-level logs to error.log file
        new winston.transports.File({ 
            filename: 'error.log',
            level: 'error'
        }),

        // Outputs logs to the console (useful during development)
        new winston.transports.Console()
    ]
});

module.exports = logger;
