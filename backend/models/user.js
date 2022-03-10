const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
  status: { type: String, default: "New" },
  likedCats: [{ type: Schema.Types.ObjectId, ref: "Cat" }],
  dislikedCats: [{ type: Schema.Types.ObjectId, ref: "Cat" }],
  //   points: { type: Number, default: 20 },
});

module.exports = mongoose.model("User", userSchema);
