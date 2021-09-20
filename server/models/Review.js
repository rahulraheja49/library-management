const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
