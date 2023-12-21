const secretKey = '@34TYUi09#nupq1'
const jwt = require('jsonwebtoken');

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    if (typeof token !== 'undefined') {
        const jwtToken = token.split(' ')[1];
        try {
            const verify = jwt.verify(jwtToken, secretKey);
            next();
        } catch(err) {
            res.status(401).send("Unauthorized");
        }
    } else {
        res.status(401).send("Unauthorized");
    }
}

module.exports = adminMiddleware;