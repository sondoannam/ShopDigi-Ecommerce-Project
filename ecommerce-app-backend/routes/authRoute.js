const express = require('express');
const {
    createUser,
    loginUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishList,
    saveAddress,
    userCart,
    getUserCart,
    createOrder,
    getMyOrders,
    removeProductFromCart,
    updateProductQuantityFromCart,
    checkProductFromCart,
    getMonthWiseOrderIncome,
    getYearlyTotalOrders,
    getAllOrders,
    getSingleOrder,
    updateOrder,
} = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authenticationHandler');
const router = express.Router();

router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);

// router.put('/order/update-order/:id', authMiddleware, isAdmin, updateOrderStatus);

router.put('/password', authMiddleware, updatePassword);
router.post('/login', loginUser);
router.post('/admin-login', loginAdmin);
router.post('/cart', authMiddleware, userCart);
// router.post('/cart/apply-coupon', authMiddleware, applyCoupon);
router.post('/cart/create-order', authMiddleware, createOrder);
router.get('/all-users', getAllUsers);
router.get('/get-month-wise-order-income', authMiddleware, getMonthWiseOrderIncome);
router.get('/get-year-total-order', authMiddleware, getYearlyTotalOrders);
router.get("/all-orders", authMiddleware, isAdmin, getAllOrders);
router.get('/get-my-orders', authMiddleware, getMyOrders);
router.get('/get-order/:id', authMiddleware, isAdmin, getSingleOrder);
// router.get("/getorderbyuser/:id", authMiddleware, isAdmin, getOrderByUserId);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logout);
router.get('/wishlist', authMiddleware, getWishList);
router.get('/cart', authMiddleware, getUserCart);
router.get('/:id', getUser);
// router.delete('/empty-cart', authMiddleware, emptyCart);
router.delete('/:id', authMiddleware, deleteUser);
router.delete('/remove-product-cart/:cartItemId', authMiddleware, removeProductFromCart);

router.put('/update-order/:id', authMiddleware, isAdmin, updateOrder);
router.put('/edit', authMiddleware, updateUser);
router.put('/save-address', authMiddleware, saveAddress);
router.put('/block/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock/:id', authMiddleware, isAdmin, unblockUser);

router.patch('/update-product-cart/:cartItemId/:newQuantity', authMiddleware, updateProductQuantityFromCart);
router.patch('/select-product-cart/:cartItemId/:checked', authMiddleware, checkProductFromCart);

module.exports = router;