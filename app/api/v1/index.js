const { Router } = require('express');
const router = Router();
const auth = require('./auth.api');
const user = require('./user.api');
const image =require('./image.api')

router.use('/auth', auth);
router.use('/user', user);
router.use('/images',image)

module.exports = router;