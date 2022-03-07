const express = require("express");
const router = express.Router();
const userSeed = require("../models/seedData/usersSeed");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const path = require("path");
dotenv.config({ path: path.resolve("routes", "../../.env") });

console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
// console.log("process.env.PORT", process.env.PORT);

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

// "/api/users/signup" - create new user
router.post("/signup", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    if (!displayName) displayName = email;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json({ message: "New user successfully created", data: savedUser });
    console.log("New user successfully created");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

// "/api/users/login"
router.post("/login", async (req, res) => {
  try {
    //! extract email and password from request body
    const { email, password } = req.body;
    console.log("email", email);
    console.log("password", password);
    //! check all fields are filled up
    if (!email || !password) {
      console.log("Not all fields have been entered.");
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    //! check whether user is registered
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("No account with this email has been registered.");
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    }
    //! check password from request body against hashed password from database (of identified user)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials.");
      return res.status(400).json({ msg: "Invalid credentials." });
    }
    //! Create a token if the login credentials are found to match
    // sign method is used to create a token. The first parameter is the payload and the second parameter is the secret key.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log("token", token);
    console.log("id", user._id);
    console.log("user.displayName", user.displayName);
    //! Send response with token, user, display name
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
    //! Catch error
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error: Did not manage to login");
  }
});

module.exports = router;
