const express = require('express');
const router = express.Router();
const { register, login, resetpassword, getProfile } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

router.post('/register', register);

router.post('/login', login);

router.post('/reset-password', resetpassword);

router.get('/profile', protect, getProfile);

module.exports = router;