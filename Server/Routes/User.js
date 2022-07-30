const express = require('express');
const router = express.Router();
const userViews = require('../Views/User');

// get user info (authentication required)
router.get('/', userViews.profile);

// login route
router.post('/login', userViews.login)

// register route
router.post('/register', userViews.register)

module.exports = router;