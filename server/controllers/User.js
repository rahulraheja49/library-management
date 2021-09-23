const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const chalk = require("chalk");

const User = require("../models/User");
const Book = require("../models/Book");

exports.getBorrowedBooks = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id).populate({
      path: "borrowedBooks.bookId",
    });
    res.status(200).send({ success: true, myBooks: userDetails.borrowedBooks });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false, msg: "Server error", err });
  }
};
