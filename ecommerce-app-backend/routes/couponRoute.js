const express = require('express');
const couponController = require('../controllers/couponController');
const { authMiddleware, isAdmin } = require('../middlewares/authenticationHandler');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, couponController.createCoupon);
router.get('/', authMiddleware, isAdmin, couponController.getAllCoupons);
router.get('/:id', authMiddleware, isAdmin, couponController.getCoupon);
router.put('/:id', authMiddleware, isAdmin, couponController.updateCoupon);
router.delete('/:id', authMiddleware, isAdmin, couponController.deleteCoupon);

module.exports = router;