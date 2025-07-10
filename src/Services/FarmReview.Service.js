const farmReviewRepo = require("../Repository/FarmReview.Repository");

const addReview = async (data) => {
    return await farmReviewRepo.createReview(data);
};

const getReviews = async (farmId) => {
    return await farmReviewRepo.getReviewsByFarm(farmId);
};

const getFarmAverageRating = async (farmId) => {
    return await farmReviewRepo.getAverageRating(farmId);
};

module.exports = {
    addReview,
    getReviews,
    getFarmAverageRating,
};
