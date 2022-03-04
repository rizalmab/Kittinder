const express = require("express");
const router = express.Router();
const userSeed = require("../models/seedData/usersSeed");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

// "/api/users/seed" - create seed users
router.get("/seed", async (req, res) => {
  //   res.status(200).send("Seed route");
  await User.deleteMany();
  const seededData = await User.create(userSeed);
  res.status(200).json({
    message: "users seeded successfully",
    data: seededData,
  });
});

// "/api/users" - retrieve all users
router.get("/", (req, res) => {
  res.status(200).send("users route");
});

// "/api/users/new" - show signup page
// get request

// "/api/users" - create new user
// post request, redirect to another page
router.post(
  "/",
  body("username").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status,
      });
      res.status(200).json({
        message: "New user created",
        data: newUser,
      });
    }
  }
);

module.exports = router;
