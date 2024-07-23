'use strict'

const { Router } = require('express');
const router = Router();

const { checkPhone, checkPassword, checkEmail } = require('../../validators/auth.validator');
const { Register, login, forgetPassword } = require('../../controllers/auth.controllers');


router.post('/register', [checkPhone, checkPassword, checkEmail], Register);
router.post('/login', checkPhone, login);
// router.post('/forget-password', checkPhone, forgetPassword);

module.exports = router;