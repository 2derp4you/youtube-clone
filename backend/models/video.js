const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        require: true,
    },
    thumbnail: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: false,
    },
    ownerId: {
        type: String,
        require: true,
    },
    ownerName: {
        type: String,
        require: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);