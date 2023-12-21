const { Admin } = require("../db");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;

    const query = await Admin.findOne({ username: username, password: password });
    if (query) {
        next();
    } else {
        res.status(500).send("Internal server error");
    }
}

module.exports = adminMiddleware;