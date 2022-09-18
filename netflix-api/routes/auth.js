const express = require('express');
const router = express.Router();

const { 
    registerUser,
    loginUser
 } = require('../controllers/authController');

router.route('/auth/register').post(registerUser);
router.route('/auth/login').post(loginUser);

module.exports = router;