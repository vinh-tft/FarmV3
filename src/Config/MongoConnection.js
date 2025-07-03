const express = require("express");
const connectMongoDB = require("./config/MongoDB");

const app = express();
const port = 3000;

app.use(express.json());

connectMongoDB();

app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});