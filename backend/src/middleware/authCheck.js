const express = require('express');
const router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next function in the stack
    }

    // User is not authenticated
    res.status(401).json({ message: "Please log in to access this resource." });
}

module.exports = ensureAuthenticated;