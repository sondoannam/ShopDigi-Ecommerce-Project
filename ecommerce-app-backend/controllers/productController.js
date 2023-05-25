const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../Utilities/validateMongoDbId");

class ProductController {
  createProduct = asyncHandler(async (req, res) => {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    try {
      const newProduct = await Product.create(req.body);
      res.json(newProduct);
    } catch (error) {
      throw new Error(error.message);
    }
  });

  getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const findProduct = await Product.findById(id).populate('color');
      res.json(findProduct);
    } catch (error) {
      throw new Error(error.message);
    }
  });

  getAllProducts = asyncHandler(async (req, res) => {
    try {
      // Filtering
      const queryObj = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];

      excludeFields.forEach((field) => delete queryObj[field]);
      console.log(queryObj);
      let queryStr = JSON.stringify(queryObj);

      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );

      let query = Product.find(JSON.parse(queryStr));

      // Sorting
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }

      // limiting the fields
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }

      // pagination
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;

      query = query.skip(skip).limit(limit);

      if (req.query.page) {
        const productCount = await Product.countDocuments();
        if (skip >= productCount) throw new Error("This page does not exist");
      }
      console.log(page, skip, limit);

      const products = await query;
      res.json(products);
    } catch (error) {
      throw new Error(error.message);
    }
  });

  updateProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    validateMongoDbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updateProduct = await Product.findOneAndUpdate({ id }, req.body, {
        new: true,
      });
      res.json(updateProduct);
    } catch (error) {
      throw new Error(error.message);
    }
  });

  deleteProductSoftly = asyncHandler(async (req, res) => {
    try {
      const deleteProduct = await Product.delete({ _id: req.params.id });
      res.json(deleteProduct);
    } catch (error) {
      throw new Error(error.message);
    }
  });

  deleteProductPermanently = asyncHandler(async (req, res) => {
    try {
      const deleteProduct = await Product.deleteOne({ _id: req.params.id });
      res.json(deleteProduct);
    } catch (error) {
      throw new Error(error.message);
    }
  });

  addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;
    try {
      const user = await User.findById(_id);
      const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
      if (alreadyadded) {
        let user = await User.findByIdAndUpdate(
          _id,
          {
            $pull: { wishlist: prodId },
          },
          {
            new: true,
          }
        );
        res.json(user);
      } else {
        let user = await User.findByIdAndUpdate(
          _id,
          {
            $push: { wishlist: prodId },
          },
          {
            new: true,
          }
        );
        res.json(user);
      }
    } catch (error) {
      throw new Error(error);
    }
  });

  rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, productId, comment } = req.body;

    try {
      const product = await Product.findById(productId);
      const userComment = await User.findById(_id);
      let alreadyRated = product.ratings.find(
        (userId) => userId.postedby.toString() === _id.toString()
      );
      if (alreadyRated) {
        const updateRating = await Product.updateOne(
          {
            ratings: { $elemMatch: alreadyRated },
          },
          {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment },
          },
          {
            new: true,
          }
        );
        res.json(updateRating);
      } else {
        const rateProduct = await Product.findByIdAndUpdate(
          productId,
          {
            $push: {
              ratings: {
                star: star,
                comment: comment,
                postedby: _id,
                name: userComment.firstname.toString(),
              },
            },
          },
          {
            new: true,
          }
        );
        res.json(rateProduct);
      }
      const getAllRatings = await Product.findById(productId);
      let totalRating = getAllRatings.ratings.length;

      let ratingSum = getAllRatings.ratings
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0);

      let actualRating = ratingSum / totalRating;

      let finalProduct = await Product.findByIdAndUpdate(
        productId,
        {
          totalRating: actualRating.toFixed(1),
        },
        {
          new: true,
        }
      );

      res.json(finalProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
}
module.exports = new ProductController();
