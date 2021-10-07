const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const chalk = require("chalk");

const User = require("../models/User");
const Book = require("../models/Book");
const Review = require("../models/Review");

exports.getUserDetails = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id).populate({
      path: "borrowedBooks.bookId",
    });
    res.status(200).send({
      success: true,
      myBooks: userDetails.borrowedBooks,
      fineAmt: userDetails.fine,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false, msg: "Server error", err });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    var usersProjection = {
      __v: false,
      _id: false,
    };

    const allReviews = await Review.find({}, usersProjection).populate(
      "user",
      "fullName"
    );
    res.send({ allReviews, success: true });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

exports.submitReview = async (req, res) => {
  try {
    const { text } = req.body;

    new Review({
      text,
      user: req.user,
    })
      .save()
      .then((newReview) => {
        console.log("new review is:", newReview);

        return res.status(200).send({ success: true });
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(400)
          .send({ msg: "Some error required", success: false });
      });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};
