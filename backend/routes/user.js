const express = require("express");
const router = express.Router();
const userSeed = require("../models/seedData/usersSeed");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

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

// "/api/users/signup" - create new user
// post request, redirect to another page
router.post(
  "/signup",
  // validate email and password
  // body("username").isEmail(),
  // body("password").isLength({ min: 5 }),
  // check for errors and return it as json if there are
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    // // hash the password and create a new user
    // const hashedPassword = bcrypt.hash(req.body.password, 10);
    try {
      console.log("req.body", req.body);
      // const newUser = await User.create({
      //   username: req.body.username,
      //   password: hashedPassword,
      //   // status: req.body.status,
      // });
      // res.status(200).json({
      //   message: "New user created",
      //   data: newUser,
      // });
    } catch (err) {
      console.log("Error ", err);
    }
    // .redirect("/");
  }
);

// "/api/users/tokenIsValid"
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
