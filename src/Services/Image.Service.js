const { bucket, db } = require("../Config/firebase");
const imageRepo = require("../Repository/Image.Repository");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const os = require("os");
const fs = require("fs");

const uploadImage = async (file) => {
    const filename = `${Date.now()}-${file.originalname}`;
    const tempPath = path.join(os.tmpdir(), filename);

    fs.writeFileSync(tempPath, file.buffer);

    await bucket.upload(tempPath, {
        destination: filename,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: uuidv4(),
            },
        },
    });

    fs.unlinkSync(tempPath);

    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media`;

    const savedImage = await imageRepo.addImage({ name: filename, url: publicUrl });
    return savedImage;
};

const getAllImages = async () => {
    return await imageRepo.getAllImages();
};

module.exports = {
    uploadImage,
    getAllImages,
};
