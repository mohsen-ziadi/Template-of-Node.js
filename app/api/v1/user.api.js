'use strict'

const { Router } = require('express');
const router = Router();

const { checkPhone, checkPassword, checkEmail } = require('../../validators/auth.validator');
const { verifyToken } = require('../../middlewares/auth.middlewares');
const { getMyData, editMyData, remove } = require('../../controllers/user.controllers');


router.get('/', verifyToken, getMyData);
router.patch('/', verifyToken, editMyData);
router.delete('/', verifyToken, remove);

module.exports = router;