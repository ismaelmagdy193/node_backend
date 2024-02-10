const express = require('express');
const { loginValidator } = require('../utils/vaildators/authValidetor');

const { login } = require('../services/authService');


const router = express.Router();
router.route('/login').post(loginValidator, login);

module.exports = router;