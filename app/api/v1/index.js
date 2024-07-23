const { Router } = require('express');
const router = Router();
const auth = require('./auth.api');
const user = require('./user.api');
const { verifyToken } = require('../../middlewares/auth.middlewares');
const path = require('path');

router.use('/auth', auth);
router.use('/user', user);
router.get('/images/:section/:image',verifyToken,(req, res) => {
    let url = path.join(__dirname, '../../public/uploads/' + req.params.section+"/"+ req.params.image);
    return res.sendFile(url);
  });

module.exports = router;