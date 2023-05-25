const express = require('express');
const brandController = require('../controllers/brandController');
const { authMiddleware, isAdmin } = require('../middlewares/authenticationHandler');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, brandController.createBrand);
router.put('/:id', authMiddleware, isAdmin, brandController.updateBrand);
router.delete('/:id', authMiddleware, isAdmin, brandController.deleteBrand);
router.get('/:id', authMiddleware, isAdmin, brandController.getBrand);
router.get('/', authMiddleware, isAdmin, brandController.getAllBrand);

module.exports = router;