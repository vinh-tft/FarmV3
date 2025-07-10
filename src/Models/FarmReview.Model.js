const mongoose = require('mongoose');

const FarmReviewSchema = new mongoose.Schema({
    farmId: {
        type: Number,
        ref: 'Farm',
        required: true,
    },
    userId: {
        type: Number,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('FarmReview', FarmReviewSchema);
