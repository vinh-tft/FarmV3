// const express = require("express");
// const connectMongoDB = require("./MongoDB");

// const app = express();
// const port = 3000;

// app.use(express.json());

// // Kết nối tới MongoDB trước, rồi mới khởi động server
// connectToMongo()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Không thể kết nối MongoDB, server không khởi động:", err);
//     process.exit(1);
//   });

require('dotenv').config();
const express = require('express');
// Import hàm connectToMongo từ file MongoDB.js
const { connectToMongo } = require('./MongoDB');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Route gốc
app.get('/', (req, res) => {
  res.send('🌱 Chào mừng đến với FarmV3 API!');
});

// Kết nối tới MongoDB rồi mới khởi động server
connectToMongo()
  .then(() => {
    console.log('✅ Kết nối MongoDB thành công!');
    app.listen(port, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Không thể kết nối MongoDB, server dừng lại:', err);
    process.exit(1);
  });
