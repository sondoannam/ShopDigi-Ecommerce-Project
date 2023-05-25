const mongoose = require("mongoose"); // Erase if already required
const mongooseDelete = require("mongoose-delete");

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        color: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Color",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingInfo: {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      province: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      ward: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentInfo: {
        
    },
    // itemsPrice: {
    //   type: Number,
    //   required: true,
    // },
    // shippingPrice: {
    //   type: Number,
    //   required: true,
    // },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalPriceAfterDiscount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "Ordered",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
      default: Date.now(),
    },
    month: {
      type: String,
      default: new Date().getMonth(),
    },
    isDeliveried: {
      type: Boolean,
      default: false,
    },
    deliveriedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
