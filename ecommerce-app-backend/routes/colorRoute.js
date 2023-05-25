const express = require('express');
const colorController = require('../controllers/colorController');
const { authMiddleware, isAdmin } = require('../middlewares/authenticationHandler');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, colorController.createColor);
router.put('/:id', authMiddleware, isAdmin, colorController.updateColor);
router.delete('/:id', authMiddleware, isAdmin, colorController.deleteColor);
router.get('/:id', authMiddleware, isAdmin, colorController.getColor);
router.get('/', authMiddleware, isAdmin, colorController.getAllColor);

module.exports = router;