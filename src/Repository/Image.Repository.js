const Image = require("../Models/Image.Model");

const addImage = (data) => Image.create(data);
const getAllImages = () => Image.find().sort({ createdAt: -1 });

module.exports = {
    addImage,
    getAllImages,
};
