const express = require('express');
const router = express.Router();

const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  addAddress, 
  getUserAddresses 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Existing routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

// New Address routes
router.post('/address', protect, addAddress);
router.get('/addresses', protect, getUserAddresses);

module.exports = router;