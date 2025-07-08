const admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "farmv3-e6541.firebasestorage.app",
});

const bucket = getStorage().bucket();

module.exports = { bucket };
