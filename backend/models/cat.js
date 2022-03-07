const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const catSchema = new Schema({
  name: { type: String, required: true },
  imgUrl: [{ type: String, required: true }],
  gender: { type: String, required: true },
  age: { type: Number },
  breed: { type: String },
  user: {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
});

module.exports = mongoose.model("Cat", catSchema);
