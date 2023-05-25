const mongoose = require('mongoose'); 
const mongooseDelete = require('mongoose-delete');

// Declare the Schema of the Mongo model
const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    numViews:{
        type: Number,
        default: 0,
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    isDisliked: {
        type: Boolean,
        default: false,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    images: [
        {
            public_id: String,
            url: String,
        }
    ],
    author: {
        type: 'String',
        default: 'Admin',
    },

}, 
{
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});

blogSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);