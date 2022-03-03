//* Require method
const express = require("express");
const mongoose = require("mongoose");
// require("dotenv").config({ path: "../.env" });
const dotenv = require("dotenv");

// Import Routes middleware
const cardsController = require("./controllers/cards.controller");

// App config
const app = express();
dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 8001;
console.log("process.env.PORT", process.env.PORT);
// console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);

// Middleware

// DB Config
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});

// API endpoints
app.get("/", (req, res) => {
  res.status(200).send("API plain page");
});

// Routes middleware
app.use("/api/cards", cardsController);

// Listener
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
