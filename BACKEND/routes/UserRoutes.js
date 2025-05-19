const express = require('express');
const router = express.Router();

// Import the functions from authController (or the file where you defined them)
const { loginUser, registerUser, Adminlogin } = require('../controllers/UserController.js');

// Define routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/adminlogin', Adminlogin);

module.exports = router;
