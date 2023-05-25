const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require('../middlewares/authenticationHandler');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages');
const { uploadImages, deleteImages } = require('../controllers/uploadController');

router.post('/', 
    authMiddleware, 
    isAdmin, 
    uploadPhoto.array('images', 10), 
    productImgResize,
    uploadImages,
);
router.delete('/delete-img/:id', authMiddleware, isAdmin, deleteImages);

module.exports = router;