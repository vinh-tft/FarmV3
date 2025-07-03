const express = require("express");
// const connectMongoDB = require("./MongoDB");
const { connectToMongo } = require('./MongoDB');
const app = express();
const port = 3000;

app.use(express.json());

// Khai báo route auth
const authRoutes = require('../Routes/auth.routes');
app.use('/api/auth', authRoutes);

const path = require('path');

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

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

// require('dotenv').config();
// const express = require('express');
// // Import hàm connectToMongo từ file MongoDB.js
// const { connectToMongo } = require('./MongoDB');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// // Khai báo route auth
// const authRoutes = require('../Routes/auth.routes');
// app.use('/api/auth', authRoutes);

// const path = require('path');

// app.use(express.static(path.join(__dirname, '..', 'public')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
// });

// // // Route gốc
// // app.get('/', (req, res) => {
// //   res.send('🌱 Chào mừng đến với FarmV3 API!');
// // });

// // Kết nối tới MongoDB rồi mới khởi động server
// connectToMongo()
//   .then(() => {
//     console.log('✅ Kết nối MongoDB thành công!');
//     app.listen(port, () => {
//       console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ Không thể kết nối MongoDB, server dừng lại:', err);
//     process.exit(1);
//   });


// require('dotenv').config();
// const express = require('express');
// const { connectToMongo } = require('./MongoDB');
// const path = require('path');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
// });

// connectToMongo()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ Server dừng lại vì không kết nối Mongo:', err);
//   });
