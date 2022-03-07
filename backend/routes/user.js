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

// "/api/users/signup" - create new user
router.post("/signup", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    //! validate
    // check fields are filled
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    //! check password length
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    //! check confirm password
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    //! check if have existing user
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    //! if no displayName, make the email the display name
    if (!displayName) displayName = email;
    //! Hash the password with salt
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //! Create a new user (with hashed password) in database
    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    //! Save the new user details in database
    const savedUser = await newUser.save();
    //! Send response (savedUser object)
    res.json({ message: "New user successfully created", data: savedUser });
    console.log("New user successfully created");
    //! Catch error
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
router.post("")

module.exports = router;
