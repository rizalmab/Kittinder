//* Require method
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import Routes middleware
const catsController = require("./controllers/catsController");

// App config
const app = express();
dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 8001;

// Middleware
app.use(express.json());
app.use(cors());

// DB Config
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});

// Routes middleware
app.use("/api/cats", catsController);

// API endpoints
app.get("/", (req, res) => {
  res.status(200).send("API plain page");
});

// Listener
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
