/**
 * @fileoverview JWT authentication middleware.
 * Verifies that incoming requests include a valid JSON Web Token (JWT)
 * in the Authorization header before allowing access to protected routes.
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate requests using a JWT token.
 *
 * Expected Authorization header format:
 *    Authorization: Bearer <token>
 *
 * Steps:
 *  1. Extract token from Authorization header.
 *  2. Validate token using the server's JWT secret.
 *  3. Attach decoded payload to `req.user`.
 *  4. Call `next()` if token is valid, otherwise return an error.
 *
 * @function authMiddleware
 */
const authMiddleware = (req, res, next) => {

    // Extract token from header (expects "Bearer <token>")
    const token = req.header('Authorization')?.split(' ')[1];

    // If no token is provided, block the request
    if (!token) {
        return res.status(401).json({ error: 'Access denied.' });
    }

    try {
        // Verify the token using the secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user data (decoded token payload) to the request
        req.user = verified;

        // Continue to the next middleware/controller
        next();

    } catch (error) {
        // Token is invalid or expired
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
