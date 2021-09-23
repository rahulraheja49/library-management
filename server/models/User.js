const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Book = require("./Book");

const userSchema = new Schema({
  fullName: {
    type: String,
  },
  fine: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  borrowedBooks: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
      },
    },
  ],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
