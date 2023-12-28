const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    if (typeof token !== 'undefined') {
        const jwtToken = token.split(' ')[1];
        try {
            const verify = jwt.verify(jwtToken, SECRET_KEY);
            if (verify.username) {
                next();
            } else {
                throw new Error("Watch Out!!!");
            }
        } catch(err) {
            res.status(401).send("Unauthorized");
        }
    } else {
        res.status(401).send("Unauthorized");
    }
}

module.exports = adminMiddleware;