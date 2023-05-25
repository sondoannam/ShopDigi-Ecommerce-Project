const Coupon = require('../models/couponModel');
const validateMongoDbId = require('../Utilities/validateMongoDbId');
const asyncHandler = require('express-async-handler');

class CouponController {
    createCoupon = asyncHandler(async (req, res) => {
        try {
            const newCoupon = await Coupon.create(req.body);
            res.json(newCoupon);
        } catch (error) {
            throw new Error(error.message);
        }
    });
    
    getAllCoupons = asyncHandler(async (req, res) => {
        try {
            const Coupons = await Coupon.find();
            res.json(Coupons);
        } catch (error) {
            throw new Error(error.message);
        }
    });

    getCoupon = asyncHandler(async (req, res) => {
        const { id } = req.params;
        validateMongoDbId(id);
        try {
          const getAcoupon = await Coupon.findById(id);
          res.json(getAcoupon);
        } catch (error) {
          throw new Error(error);
        }
    });
    
    updateCoupon = asyncHandler(async (req, res) => {
        const { id } = req.params;
        validateMongoDbId(id);
        try {
            const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.json(updatedCoupon);
        } catch (error) {
            throw new Error(error.message);
        }
    });
    
    deleteCoupon = asyncHandler(async (req, res) => {
        const { id } = req.params;
        validateMongoDbId(id);
        try {
            const deleteCoupon = await Coupon.findByIdAndDelete(id);
            res.json(deleteCoupon);
        } catch (error) {
            throw new Error(error);
        }
    });
}

module.exports = new CouponController();