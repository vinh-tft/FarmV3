const express = require("express");
const connectToMongo = require("./src/Config/MongoDB");
const farmRoutes = require("./src/Routes/FarmRoutes");
const authRoutes = require("./src/Routes/auth.route");
const userRoutes = require("./src/Routes/User.Routes");
const imageRoutes = require("./src/Routes/ImageRoutes");
const farmReviewRoutes = require("./src/Routes/FarmReview.Route");
const eventRoutes = require("./src/Routes/Event.Route");

const setupSwagger = require("./src/Config/Swagger");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

connectToMongo();

app.use("/api/farms", farmRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/farm-reviews", farmReviewRoutes);
app.use("/api/events", eventRoutes);

setupSwagger(app);


app.use((req, res) => {
  res.status(404).json({ message: "Không tìm thấy route." });
});


app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
