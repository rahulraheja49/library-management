const chalk = require("chalk");

const Book = require("../models/Book");
const User = require("../models/User");
const Request = require("../models/Request");

exports.borrowBook = async (req, res) => {
  try {
    const { id } = req.body;
    Book.findByIdAndUpdate(
      id,
      {
        $set: {
          returnOn: Date.now() + 1000 * 60 * 60 * 24 * 7,
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

    await new Book({
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
    const { id } = req.body;

    const book = await Book.findById(id);
    const today = Date.now();
    let diff;
    let fineAdded = 0;
    if (book.returnOn >= today) {
      diff = book.returnOn - today;
      diff = diff / (1000 * 60 * 60 * 24);
    } else {
      diff = today - book.returnOn;
      diff = diff / (1000 * 60 * 60 * 24);
      fineAdded = Math.floor(diff) * 1; // 1 is to show 1$
    }
    console.log(diff);

    Book.findByIdAndUpdate(
      id,
      {
        $set: {
          returnOn: null,
          borrowedBy: null,
          bookStatus: "available",
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
            $pull: {
              borrowedBooks: {
                bookId: id,
              },
            },
            $inc: {
              fine: fineAdded,
            },
          },
          (error, user) => {
            if (error) {
              console.log(chalk.cyanBright(error));
              res.status(401).send({ success: false, err: error });
            }
            res.status(200).send({ success: true, msg: "Book returned" });
          }
        );
      }
    );
  } catch (err) {
    return res.status(500).send({ success: false, msg: "Server error", err });
  }
};

exports.findAllAvailableBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({ bookStatus: "available" });
    console.log(allBooks);
    res.send({ allBooks, success: true });
  } catch (err) {
    return res.status(500).send({ success: false, msg: "Server error", err });
  }
};

exports.requestBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    new Request({
      title,
      author,
      user: req.user,
    })
      .save()
      .then((newRequest) => {
        console.log("new request is:", newRequest);

        return res
          .status(200)
          .send({ msg: "Request generated", success: true });
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
