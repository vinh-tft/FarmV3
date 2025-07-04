const express = require("express");
// const path = require("path");
const connectToMongo = require("./src/Config/MongoDB");
const farmRoutes = require("./src/Routes/FarmRoutes");
const authRoutes = require("./src/Routes/Auth.routes");
const animalRoutes = require('./src/Routes/Animal.routes');
const setupSwagger = require("./src/Config/Swagger");
const session = require('express-session');

// const app = express();
// const port = 3000;

// // Middleware
// app.use(express.json());

// // app.use(express.static(path.join(__dirname, "Public")));

// // Kết nối MongoDB
// connectToMongo();

// // Định tuyến API
// app.use("/api/auth", authRoutes);
// app.use("/api/farms", farmRoutes);
// app.use("/api/animals", animalRoutes);

// // Swagger API Docs
// setupSwagger(app);

// // // Trang mặc định
// // app.get("/", (req, res) => {
// //   res.sendFile(path.join(__dirname, "Public", "login.html"));
// // });

// // Khởi động server
// app.listen(port, () => {
//   console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
// });

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  session({
    secret: 'duyan', // Bạn có thể đổi thành chuỗi bất kỳ
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true nếu dùng HTTPS
      maxAge: 1000 * 60 * 60, // 1 giờ
    },
  })
);

connectToMongo();

app.use("/api/auth", authRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/animals", animalRoutes);

app.use("/api/auth", authRoutes);
setupSwagger(app);

app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});
