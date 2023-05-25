const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const mongooseDelete = require('mongoose-delete');
const crypto = require('crypto');

const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const userSchema = new Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isBlocked:{
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: 'user',
    },
    cart: {
        type: Array,
        default: [],
    },
    address: { 
        type: String, 
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    refreshToken: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
    timestamps: true,
});

// Add plugins
userSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

userSchema.pre("save", async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.createPasswordResetToken = async function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 mins
    return resetToken;
}

//Export the model
module.exports = mongoose.model('User', userSchema);