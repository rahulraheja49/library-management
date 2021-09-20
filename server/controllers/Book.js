const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const chalk = require("chalk");

const Book = require("../models/Book");

exports.borrowBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    Book.findOneAndUpdate(
      { title },
      {
        $set: {
          //
        },
      }
    );
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    new Book({
      title,
      author,
    })
      .save()
      .then((newBook) => {
        console.log("new book is:", newBook);

        return res.status(200).send({ msg: "Book added", success: true });
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

exports.returnBook = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

exports.findAllBooks = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

exports.requestBook = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};
