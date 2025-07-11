const express = require("express");
const session = require("express-session");
const connectToMongo = require("./src/Config/MongoDB");
const setupSwagger = require("./src/Config/Swagger");

const farmRoutes = require("./src/Routes/FarmRoutes");
const authRoutes = require("./src/Routes/Auth.routes");
const userRoutes = require("./src/Routes/User.Routes");
const animalRoutes = require("./src/Routes/Animal.routes");
const animalLogRoutes = require("./src/Routes/AnimalLog.Routes");

const app = express();
const port = 3000;

// Middleware parse JSON
app.use(express.json());

// Session config
app.use(
  session({
    secret: "duyan",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, 
    },
  })
);

// Kết nối MongoDB
connectToMongo();

// Định tuyến API
app.use("/api/auth", authRoutes);
app.use("/api/farms", farmRoutes);     
app.use("/api/animals", animalRoutes); 
app.use("/api/users", userRoutes);    
app.use("/api/animal-logs", animalLogRoutes); 

// Swagger docs
setupSwagger(app);

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
