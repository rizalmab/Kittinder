const express = require("express");
const Cards = require("../models/cardsModel");
const app = express.Router();
// import Cards from "../models/cards.model";

// POST "api/cards"
app.post("/", (req, res) => {
  try {
    const dbCard = req.body;
    const newCard = CardsModel.create(dbCard);
    res.status(200).json({
      status: "ok",
      message: "new Card created",
      data: newCard,
    });
  } catch (err) {
    console.log(error);
  }
});

// GET "api/cards"
app.get("/", (req, res) => {
  try {
    const allCards = CardsModel.find({});
    res.status(200).json({
      status: "ok",
      message: "found all cards",
      data: allCards,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
