const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const chalk = require("chalk");

const Book = require("../models/Book");
const User = require("../models/User");

exports.borrowBook = async (req, res) => {
  try {
    const { id } = req.body;
    Book.findByIdAndUpdate(
      id,
      {
        $set: {
          returnOn: Date.now(),
          borrowedBy: req.user.id,
          bookStatus: "borrowed",
        },
      },
      (err, book) => {
        if (err) {
          console.log(chalk.cyanBright(err));
          res.status(401).send({ success: false, err });
        }
        User.findByIdAndUpdate(
          req.user.id,
          {
            $addToSet: {
              borrowedBooks: {
                bookId: id,
              },
            },
          },
          (error, user) => {
            if (error) {
              console.log(chalk.cyanBright(error));
              res.status(401).send({ success: false, err: error });
            }
            res.status(200).send({ success: true, msg: "Update successful" });
          }
        );
      }
    );
  } catch (err) {
    return res.status(500).send({ success: false, msg: "Server error", err });
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
        // console.log("new book is:", newBook);

        return res.status(200).send({ msg: "Book added", success: true });
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(400)
          .send({ msg: "Some error required", success: false });
      });
  } catch (err) {
    return res.status(500).send({ success: false, msg: "Server error", err });
  }
};

exports.returnBook = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).send({ success: false, msg: "Server error", err });
  }
};

exports.findAllAvailableBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({ bookStatus: "available" });
    console.log(allBooks);
    res.send({ allBooks });
  } catch (err) {
    return res.status(500).send({ success: false, msg: "Server error", err });
  }
};

exports.requestBook = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).send({ success: false, msg: "Server error", err });
  }
};
