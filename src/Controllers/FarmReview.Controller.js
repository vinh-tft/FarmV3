const farmReviewService = require("../Services/FarmReview.Service");

const createReview = async (req, res) => {
    try {
        const { farmId, rating, comment, userId } = req.body;

        if (!farmId || !userId || typeof rating !== 'number') {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp đầy đủ farmId, userId và rating (số)',
            });
        }

        const result = await farmReviewService.addReview({
            farmId,
            userId,
            rating,
            comment,
        });

        res.status(201).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


const getReviewsByFarm = async (req, res) => {
    try {
        const { farmId } = req.params;
        const reviews = await farmReviewService.getReviews(farmId);
        const avgRating = await farmReviewService.getFarmAverageRating(farmId);

        res.status(200).json({ success: true, reviews, avgRating });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createReview,
    getReviewsByFarm,
};
