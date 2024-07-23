'use strict'

const { Router } = require('express');
const router = Router();

const { checkPhone, checkPassword, checkEmail } = require('../../validators/auth.validator');
const { Register, login, forgetPassword ,refreshToken } = require('../../controllers/auth.controllers');


router.post('/register', [checkPhone, checkPassword, checkEmail], Register);
router.post('/login', checkPhone, login);
router.post('/refresh-token', refreshToken);
router.post('/forget-password', forgetPassword);


module.exports = router;