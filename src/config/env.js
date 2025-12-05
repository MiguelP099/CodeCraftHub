/**
 * @fileoverview Environment variable loader.
 * This file loads environment variables from a `.env` file into `process.env`
 * using the `dotenv` package.
 *
 * Importing this file at the start of your application ensures that all
 * environment variables are available before other modules try to use them.
 */

require('dotenv').config(); // Loads variables from .env into process.env
