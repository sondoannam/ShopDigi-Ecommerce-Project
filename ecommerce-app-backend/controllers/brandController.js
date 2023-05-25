const Brand = require('../models/brandModel');
const asyncHandler = require('express-async-handler');

class BrandController {
    createBrand = asyncHandler(async (req, res) => {
        try {
            const newBrand = await Brand.create(req.body);
            res.json(newBrand);
        } catch (error) {
            throw new Error(error);
        }
    });

    updateBrand = asyncHandler(async (req, res) => {
        try {
            const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            res.json(updatedBrand);
        } catch (error) {
            throw new Error(error);
        }
    });

    deleteBrand = asyncHandler(async (req, res) => {
        try {
            const deleteBrand = await Brand.findByIdAndDelete(req.params.id);
            res.json(deleteBrand);
        } catch (error) {
            throw new Error(error);
        }
    });
    
    getBrand = asyncHandler(async (req, res) => {
        try {
            const findBrand = await Brand.findById(req.params.id);
            res.json(findBrand);
        } catch (error) {
            throw new Error(error);
        }
    });
    
    getAllBrand = asyncHandler(async (req, res) => {
        try {
            const allBrand = await Brand.find();
            res.json(allBrand);
        } catch (error) {
            throw new Error(error);
        }
    });
}

module.exports = new BrandController();