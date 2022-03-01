import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// App config
const app = express();
const PORT = process.env.PORT || 8001;

// Middleware

// DB Config

// API endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

// Listener
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
