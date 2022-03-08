const express = require("express");
const Cat = require("../models/cat");
const router = express.Router();
const catData = require("../models/seedData/catsSeed");

// SEED "api/cats/seed"
router.get("/seed", async (req, res) => {
  try {
    await Cat.deleteMany({});
    const catsSeed = await Cat.create(catData);
    console.log("catData", catData);
    console.log("Cats seeded!");
    res.status(200).json({
      message: "Cats seed successful",
      data: catsSeed,
    });
  } catch (err) {
    console.log("Error: ", err);
  }
});

// POST "api/cats"
router.post("/", (req, res) => {
  const dbCard = req.body;
  Cat.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// GET "api/cats"
router.get("/", async (req, res) => {
  try {
    const allCats = await Cat.find();
    res.status(200).json({ message: "Found all cats", data: allCats });
  } catch (err) {
    console.log("Error: ", err);
  }
});

// POST "/api/cats/new" - create new cat
router.post("/new", async (req, res) => {
  try {
    console.log("new cat created");
    console.log("req.body: ", req.body);
    res.status(200).json({ message: "New cat added to database", data: null });
  } catch (err) {
    console.log("Error: ", err);
  }
});

module.exports = router;
