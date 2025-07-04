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

const animalRoutes = require('./Routes/animal.routes');
app.use('/api/animals', animalRoutes);

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