const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../Utilities/validateMongoDbId');
const cloudinaryUploadImg = require('../Utilities/cloudinary');
const fs =  require('fs');

class BlogController {
    createBlog = asyncHandler(async (req, res) => {
        try {
            const newBlog = await Blog.create(req.body);
            res.json({
                status: 'success',
                newBlog,
            });
        } catch (error) {
            throw new Error(error);
        }
    });
    
    updateBlog = asyncHandler(async (req, res) => {
        try {
            const updateBlog = await Blog.findByIdAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
            });
            res.json(updateBlog);
        } catch (error) {
            throw new Error(error.message);
        }
    });
    
    getBlog = asyncHandler(async (req, res) => {
        const { id } = req.params;
        validateMongoDbId(id);
        try {
            const findBlog = await Blog.findById(id).populate('likes').populate('dislikes');
            await Blog.findByIdAndUpdate(id, 
                {
                    $inc: { numViews: 1 },
                },
                {
                    new: true,
                });
            res.json(findBlog);
        } catch (error) {
            throw new Error(error.message);
        }
    });

    getAllBlog = asyncHandler(async (req, res) => {
        try {
            const findBlog = await Blog.find();
            res.json(findBlog);
        } catch (error) {
            throw new Error(error.message);
        }
    });

    deleteBlogSoftly = asyncHandler(async (req, res) => {
        try {
            const deleteBlog = await Blog.delete({ _id: req.params.id });
            res.json(deleteBlog);
        } catch (error) {
            throw new Error(error.message);
        }
    });
    
    deleteBlogPermanently = asyncHandler(async (req, res) => {
        try {
            const deleteBlog = await Blog.deleteOne(req.params.id);
            res.json(deleteBlog);
        } catch (error) {
            throw new Error(error.message);
        }
    });

    likeBlog = asyncHandler(async (req, res) => {
        const { blogId } = req.body;
        validateMongoDbId(blogId); 

        // Like the blog
        const blog = await Blog.findById(blogId);
        const loginUserId = req?.user?._id;
        const isLiked = blog?.isLiked;
        const alreadyDisLiked = blog?.dislikes?.find(
            (userId) => userId?.toString() === loginUserId?.toString()
        );

        if (alreadyDisLiked) {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull: { dislikes: loginUserId },
                isDisliked: false,
            }, {
                new: true,
            });
            res.json(blog);
        }

        if (isLiked) {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull: { likes: loginUserId },
                isLiked: false,
            }, {
                new: true,
            });
            res.json(blog);
        }
        else {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $push: { likes: loginUserId },
                isLiked: true,
            }, {
                new: true,
            });
            res.json(blog);
        }
    });

    dislikeBlog = asyncHandler(async (req, res) => {
        const { blogId } = req.body;
        validateMongoDbId(blogId); 

        // Like the blog
        const blog = await Blog.findById(blogId);
        const loginUserId = req?.user?._id;
        const isDisLiked = blog?.isDisliked;
        const alreadyLiked = blog?.likes?.find(
            (userId) => userId?.toString() === loginUserId?.toString()
        );

        if (alreadyLiked) {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull: { likes: loginUserId },
                isLiked: false,
            }, {
                new: true,
            });
            res.json(blog);
        }

        if (isDisLiked) {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull: { dislikes: loginUserId },
                isDisliked: false,
            }, {
                new: true,
            });
            res.json(blog);
        }
        else {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $push: { dislikes: loginUserId },
                isDisliked: true,
            }, {
                new: true,
            });
            res.json(blog);
        }
    });

    uploadImages = asyncHandler(async (req, res) => {
        const { id } = req.params;
        validateMongoDbId(id); 
        try {
            const uploader = (path) => cloudinaryUploadImg(path, 'images');
            const urls = [];
            const files = req.files;

            for (const file of files) {
                const { path } = file;
                const newpath = await uploader(path);

                urls.push(newpath);

                fs.unlinkSync(path);
            }
            const findBlog = await Blog.findByIdAndUpdate(id, {
                images: urls.map((file) => file)
            }, {
                new: true,
            });
            res.json(findBlog);
        } catch (error) {  
            throw new Error(error);
        }
    });

}

module.exports = new BlogController();