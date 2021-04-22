const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

const Post = module.exports = mongoose.model('posts', PostSchema);
