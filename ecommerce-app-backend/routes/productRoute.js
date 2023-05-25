const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const { isAdmin, authMiddleware } = require('../middlewares/authenticationHandler');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages');

router.post('/create', authMiddleware, isAdmin, productController.createProduct);


router.get('/:id', productController.getProduct);
router.put('/wishlist', authMiddleware, productController.addToWishlist);
router.put('/rating', authMiddleware, productController.rating);
router.get('/', productController.getAllProducts);
router.put('/:id', authMiddleware, isAdmin, productController.updateProduct);
router.delete('/:id', authMiddleware, isAdmin, productController.deleteProductSoftly);

module.exports = router;