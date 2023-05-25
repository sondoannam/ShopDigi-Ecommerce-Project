const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
    },
    checked: {
        type: String,
        default: 'Unchecked',
        enum: ['Checked', 'Unchecked'],
    },
}, {
    timestamps: true,
});

//Export the model
module.exports = mongoose.model('Cart', cartSchema);