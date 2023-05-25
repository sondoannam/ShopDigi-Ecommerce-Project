const express = require('express');
const categoryController = require('../controllers/productCategoryController');
const { authMiddleware, isAdmin } = require('../middlewares/authenticationHandler');
const router = express.Router();

router.post('/', authMiddleware, isAdmin,categoryController.createCategory);
router.put('/:id', authMiddleware, isAdmin,categoryController.updateCategory);
router.delete('/:id', authMiddleware, isAdmin,categoryController.deleteCategory);
router.get('/:id', authMiddleware, isAdmin,categoryController.getCategory);
router.get('/', authMiddleware, isAdmin,categoryController.getAllCategory);

module.exports = router;