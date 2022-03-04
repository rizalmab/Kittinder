//* Require method
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { body } = require("express-validator");

// import Routes middleware
const catsController = require("./controllers/catsController");
const userController = require("./controllers/userController");

// App config
const app = express();
dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 8001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes middleware
app.use("/api/cats", catsController);
app.use("/api/users", userController);

// API endpoints
app.get("/", (req, res) => {
  res.status(200).send("API working!");
});

// DB Config
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});

// Listener
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
