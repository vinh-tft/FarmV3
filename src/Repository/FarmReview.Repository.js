const FarmReview = require("../Models/FarmReview.Model");

const createReview = async (reviewData) => {
    return await FarmReview.create(reviewData);
};

const getReviewsByFarm = async (farmId) => {
    return await FarmReview.find({ farmId }).populate('userId', 'name');
};

const getAverageRating = async (farmId) => {
    const result = await FarmReview.aggregate([
        { $match: { farmId: require('mongoose').Types.ObjectId(farmId) } },
        { $group: { _id: '$farmId', avgRating: { $avg: '$rating' } } },
    ]);

    return result.length ? result[0].avgRating : 0;
};

module.exports = {
    createReview,
    getReviewsByFarm,
    getAverageRating,
};
