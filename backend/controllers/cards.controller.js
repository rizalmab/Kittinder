const express = require("express");
const CardsModel = require("../models/cardsModel");
const app = express.Router();
const catData = require("../models/seedData/catsSeed");

// SEED "api/cards/seed"
app.get("/seed", async (req, res) => {
  await CardsModel.deleteMany({});
  const cardSeed = await CardsModel.create(catData);
});

// POST "api/cards"
app.post("/", (req, res) => {
  const dbCard = req.body;
  CardsModel.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// GET "api/cards"
app.get("/", (req, res) => {
  CardsModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = app;
