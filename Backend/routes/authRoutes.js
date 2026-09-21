const express = require('express');
const { registerUser, loginUser } = require('../controller/authController'); // Match lowercase r & l, and plural 'controllers'

const router = express.Router(); 

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;