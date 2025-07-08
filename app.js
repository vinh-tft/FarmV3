const express = require("express");
const connectToMongo = require("./src/Config/MongoDB");
const farmRoutes = require("./src/Routes/FarmRoutes");
const authRoutes = require("./src/Routes/auth.route");
const userRoutes = require("./src/Routes/User.Routes");
const imageRoutes = require("./src/Routes/ImageRoutes");
const setupSwagger = require("./src/Config/Swagger");

const app = express();
const port = 3000;

app.use(express.json());

connectToMongo();

app.use("/api/farms", farmRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/images", imageRoutes);

setupSwagger(app);

app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
