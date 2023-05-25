const express = require('express');
const blogController = require('../controllers/blogController');
const { authMiddleware, isAdmin } = require('../middlewares/authenticationHandler');
const { blogImgResize, uploadPhoto } = require('../middlewares/uploadImages');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, blogController.createBlog);
router.put(
    "/upload/:id",
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 2),
    blogImgResize,
    blogController.uploadImages
  );
router.put('/likes', authMiddleware, blogController.likeBlog);
router.put('/dislike', authMiddleware, blogController.dislikeBlog);
router.put('/:id', authMiddleware, isAdmin, blogController.updateBlog);
router.get('/:id', blogController.getBlog);
router.get('/',  blogController.getAllBlog);
router.delete('/:id', authMiddleware, isAdmin, blogController.deleteBlogSoftly);
router.delete('/:id/force', authMiddleware, isAdmin, blogController.deleteBlogPermanently);

module.exports = router;