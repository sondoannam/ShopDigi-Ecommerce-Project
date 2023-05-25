const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const validateMongoDbId = require("../Utilities/validateMongoDbId");
const { sendEmail } = require("./emailController");
const crypto = require("crypto");
const uniqid = require("uniqid");
const { log } = require("console");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });

  if (!findUser) {
    // Create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // User already exists
    throw new Error(`User already exists`);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error(`Your input is not correct `);
  }
});

// Admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user exists or not
  const findAdmin = await User.findOne({ email });

  if (findAdmin.role !== "admin") throw new Error("Not authorized");

  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateUser = await User.findByIdAndUpdate(
      findAdmin._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error(`Your input is not correct `);
  }
});

// Handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token in cookie");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user)
    throw new Error(
      "No Refresh Token present in DB or the Token is not matched"
    );
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// Logout function
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token in cookie");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find().populate("wishlist");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findById(id);
    res.json(singleUser);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Update a user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req.body?.firstname,
        lastname: req.body?.lastname,
        email: req.body?.email,
        mobile: req.body?.mobile,
        address: req.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error.message);
  }
});

// save user Address
const saveAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Block and unblock an User
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({ message: "User is blocked" });
  } catch (error) {
    throw new Error(error.message);
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({ message: "User is unblocked" });
  } catch (error) {
    throw new Error(error.message);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;

  validateMongoDbId(_id);

  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Follow this link to reset your password. <a href='http://localhost:3000/reset-password/${token}'>Click here</a>`;
    const data = {
      to: email,
      text: "Change Password",
      subject: "Forgot Password Link",
      html: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error.message);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Token Expired, please try again later");

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();
  res.json(user);
});

const getWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { productId, color, quantity, price } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let newCart = await new Cart({
      userId: _id,
      productId,
      color,
      price,
      quantity,
    }).save();

    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const cart = await Cart.find({ userId: _id })
      .populate("productId")
      .populate("color");

    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  validateMongoDbId(_id);

  try {
    const cartDelete = await Cart.deleteOne({ _id: cartItemId, userId: _id });
    //res.json(_id);
    res.json(cartDelete);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductQuantityFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, newQuantity } = req.params;
  console.log(cartItemId);
  console.log(newQuantity);
  validateMongoDbId(_id);

  try {
    const cartItem = await Cart.findOne({ _id: cartItemId, userId: _id });
    cartItem.quantity = newQuantity;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const checkProductFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, checked } = req.params;
  validateMongoDbId(_id);
  validateMongoDbId(cartItemId);

  try {
    const cartItem = await Cart.findOne({ _id: cartItemId, userId: _id });
    cartItem.checked = checked;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
    paymentMethod,
  } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (paymentMethod === "later_money") {
      let order = await Order.create({
        shippingInfo,
        orderItems,
        totalPrice,
        totalPriceAfterDiscount,
        paymentMethod,
        user: _id,
      });
      res.json({
        order,
        success: true,
      });
    } else if (paymentMethod === "paypal") {
      const { paidAt } = req.body;
      let order = await Order.create({
        shippingInfo,
        orderItems,
        totalPrice,
        totalPriceAfterDiscount,
        paymentMethod,
        isPaid: true,
        paidAt,
        user: _id,
      });
      res.json({
        order,
        success: true,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const orders = await Order.find({ user: _id })
      .populate("user")
      .populate("orderItems.product")
      .populate("orderItems.color");
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("orderItems.product");
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

const getSingleOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ _id: id })
    .populate("orderItems.product")
    .populate("orderItems.color");
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    order.orderStatus = req.body.status;
    await order.save();
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

const getMonthWiseOrderIncome = asyncHandler(async (req, res) => {
  try {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();
    let endDate = "";
    date.setDate(1);
    for (let i = 0; i < 11; i++) {
      date.setMonth(date.getMonth() - 1);
      endDate = monthNames[date.getMonth()] + " " + date.getFullYear();
    }
    console.log(endDate);
    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: new Date(),
            $gte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: {
            month: "$month",
          },
          amount: {
            $sum: "$totalPriceAfterDiscount",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    res.json(data);
  } catch (error) {
    throw new Error(error);
  }
});

const getYearlyTotalOrders = asyncHandler(async (req, res) => {
  try {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();
    let endDate = "";
    date.setDate(1);
    for (let i = 0; i < 11; i++) {
      date.setMonth(date.getMonth() - 1);
      endDate = monthNames[date.getMonth()] + " " + date.getFullYear();
    }
    console.log(endDate);
    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: new Date(),
            $gte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          amount: { $sum: "$totalPriceAfterDiscount" },
        },
      },
    ]);
    res.json(data);
  } catch (error) {
    throw new Error(error);
  }
});

// const emptyCart = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   validateMongoDbId(_id);

//   try {
//     const user = await User.findOne({ _id });
//     const cart = await Cart.findOneAndRemove({ orderBy: user._id });
//     res.json(cart);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const applyCoupon = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   validateMongoDbId(_id);
//   const { coupon } = req.body;
//   const validCoupon = await Coupon.findOne({ name: coupon });

//   if (validCoupon === null) {
//     throw new Error("Invalid Coupon");
//   }

//   const user = await User.findOne({ _id });
//   let { cartTotal } = await Cart.findOne({ orderBy: user._id }).populate(
//     "products.product"
//   );
//   let totalAfterDiscount = (
//     cartTotal -
//     (cartTotal * validCoupon.discount) / 100
//   ).toFixed(2);

//   await Cart.findOneAndUpdate(
//     { order: user._id },
//     { totalAfterDiscount },
//     { new: true }
//   );
//   res.json(totalAfterDiscount);
// });

// const updateOrderStatus = asyncHandler(async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const updateOrder = await Order.findByIdAndUpdate(
//       id,
//       {
//         orderStatus: status,
//         paymentIntent: {
//           status: status,
//         },
//       },
//       {
//         new: true,
//       }
//     );
//     res.json(updateOrder);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

module.exports = {
  createUser,
  loginUser,
  loginAdmin,
  logout,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  removeProductFromCart,
  updateProductQuantityFromCart,
  checkProductFromCart,
  // emptyCart,
  // applyCoupon,
  createOrder,
  getMyOrders,
  // getOrders,
  getAllOrders,
  getSingleOrder,
  // getOrderByUserId,
  // updateOrderStatus,
  getMonthWiseOrderIncome,
  getYearlyTotalOrders,
  updateOrder,
};
