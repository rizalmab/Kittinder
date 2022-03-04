const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // name: { type: String, required: true },
  status: { type: String, required: true },
  likedCats: [
    {
      catId: { type: Schema.Types.ObjectId, ref: "Cat" },
    },
  ],
  dislikedCats: [
    {
      catId: { type: Schema.Types.ObjectId, ref: "Cat" },
    },
  ],
  //   points: { type: Number, default: 20 },
});

module.exports = mongoose.model("User", userSchema);
