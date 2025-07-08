const imageService = require("../Services/Image.Service");

exports.upload = async (req, res) => {
    try {
        const result = await imageService.uploadImage(req.file);
        res.status(201).json(result);
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ message: "Lỗi khi upload ảnh" });
    }
};

exports.getAll = async (req, res) => {
    try {
        const images = await imageService.getAllImages();
        res.json(images);
    } catch (err) {
        console.error("Get all images error:", err);
        res.status(500).json({ message: "Lỗi khi lấy danh sách ảnh" });
    }
};
