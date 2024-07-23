'use strict';

const { Router } = require('express');
const router = Router();

const { verifyToken } = require('../../middlewares/auth.middlewares');
const { upload, image, getAll, removeUpload } = require('../../controllers/image.controller');


router.post('/upload/:section', verifyToken, upload);
router.get('', verifyToken, getAll);
router.get('/:section/:image', image)
router.delete('/:id', verifyToken, removeUpload)

module.exports = router;