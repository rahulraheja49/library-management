const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./User");

const bookSchema = new Schema({
  author: {
    type: String,
  },
  title: {
    type: String,
  },
  borrowedBooks: {
    type: Number,
    default: 0,
  },
  totalBooks: {
    type: Number,
    default: 1,
  },
  instances: [
    {
      bookStatus: {
        type: String,
        enum: ["available", "borrowed"],
        default: "available",
      },
      returnOn: {
        type: Date,
      },
      borrowedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        default: null,
      },
    },
  ],
});

const Book = mongoose.model("book", bookSchema);

module.exports = Book;
