const Category = require('../models/blogCategoryModel');
const asyncHandler = require('express-async-handler');

class BCategoryController {
    createCategory = asyncHandler(async (req, res) => {
        try {
            const newCategory = await Category.create(req.body);
            res.json(newCategory);
        } catch (error) {
            throw new Error(error);
        }
    });

    updateCategory = asyncHandler(async (req, res) => {
        try {
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            res.json(updatedCategory);
        } catch (error) {
            throw new Error(error);
        }
    });

    deleteCategory = asyncHandler(async (req, res) => {
        try {
            const deleteCategory = await Category.findByIdAndDelete(req.params.id);
            res.json(deleteCategory);
        } catch (error) {
            throw new Error(error);
        }
    });
    
    getCategory = asyncHandler(async (req, res) => {
        try {
            const findCategory = await Category.findById(req.params.id);
            res.json(findCategory);
        } catch (error) {
            throw new Error(error);
        }
    });
    
    getAllCategory = asyncHandler(async (req, res) => {
        try {
            const allCategory = await Category.find();
            res.json(allCategory);
        } catch (error) {
            throw new Error(error);
        }
    });
}

module.exports = new BCategoryController();