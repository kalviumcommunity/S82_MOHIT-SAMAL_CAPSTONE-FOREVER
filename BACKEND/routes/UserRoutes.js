const express = require('express');
const router = express.Router();

// Import the functions from authController (or the file where you defined them)
const { loginUser, registerUser, Adminlogin, getProfile, updateProfile } = require('../controllers/UserController.js');


// Auth middleware
const authUser = require('../middleware/auth');

// Define routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/adminlogin', Adminlogin);

// Profile routes
router.get('/profile', authUser, getProfile);
router.put('/profile', authUser, updateProfile);

module.exports = router;
