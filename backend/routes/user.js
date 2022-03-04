const express = require("express");
const router = express.Router();
const userSeed = require("../models/seedData/usersSeed");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bycrypt = require("bcrypt");

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
  (req, res) => {
    console.log("req.body", req.body);
  }
  // // validate email and password
  // body("email").isEmail(),
  // body("password").isLength({ min: 5 }),
  // // check for errors and return it as json if there are
  // async (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   } else {
  //     // hash the password and create a new user
  //     const hashedPassword = bcrypt.hash(req.body.password, 10);
  //     const newUser = await User.create({
  //       username: req.body.email,
  //       password: hashedPassword,
  //       status: req.body.status,
  //     });
  //     res
  //       .status(200)
  //       .json({
  //         message: "New user created",
  //         data: newUser,
  //       })
  //       .redirect("/");
  //   }
  // }
);

// router.post("/Register",(req,res)=>{
//   console.log(req.body)
//   const {name,email,password} =req.body;
//   User.findOne({email:email},(err,user)=>{
//       if(user){
//           res.send({message:"user already exist"})
//       }else {
//           const user = new User({name,email,password})
//           user.save(err=>{
//               if(err){
//                   res.send(err)
//               }else{
//                   res.send({message:"sucessfull"})
//               }
//           })
//       }
//   })

module.exports = router;
