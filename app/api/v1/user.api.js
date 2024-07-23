'use strict'

const { Router } = require('express');
const router = Router();

const { checkPhone, checkPassword, checkEmail } = require('../../validators/auth.validator');
const { verifyToken } = require('../../middlewares/auth.middlewares');
const { getMyData, editMyData } = require('../../controllers/user.controllers');


router.get('/', verifyToken, getMyData);
router.patch('/', verifyToken, editMyData);



module.exports = router;