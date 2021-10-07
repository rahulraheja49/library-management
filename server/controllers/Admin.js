const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Book = require("../models/Book");
const Admin = require("../models/Admin");
const User = require("../models/User");
const Request = require("../models/Request");

exports.viewReviews = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

exports.signup = async (req, res) => {
  try {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword);
    const { email, fullName } = req.body;

    Admin.findOne({ email }).then((currentUser) => {
      if (currentUser) {
        return res.send({
          msg: "Admin already exists, please log in instead",
          success: false,
        });
      } else {
        new Admin({
          email,
          fullName,
          password: securePassword,
        })
          .save()
          .then((newAdmin) => {
            console.log("new admin is:", newAdmin);

            const token = jwt.sign(
              { id: newAdmin._id, username: newAdmin.username },
              process.env.JWT_SECRET_BCRYPT
            );

            return res
              .status(200)
              .send({ data: token, success: true, name: fullName });
          })
          .catch((error) => {
            console.log(error);
            return res
              .status(400)
              .send({ msg: "Some error required", success: false });
          });
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return res.send({ status: "error", msg: "Invalid username/password" });
    }

    if (await bcrypt.compare(password, admin.password)) {
      const token = jwt.sign(
        { id: admin._id, username: admin.username },
        process.env.JWT_SECRET_BCRYPT
      );
      return res.send({
        status: "ok",
        data: token,
        success: true,
      });
    }

    return res.send({
      status: "error",
      msg: "Invalid username/password",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

exports.viewRequests = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

exports.getBorrowedBooksList = async (req, res) => {
  try {
    const borrBooks = await Book.find({ bookStatus: "borrowed" });
    return res.send({ borrBooks, success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

exports.findAllAvailableBooksAndUsersAndRequests = async (req, res) => {
  try {
    const allBooks = await Book.find({ bookStatus: "available" });
    const allUsers = await User.find({});
    const allRequests = await Request.find({}).sort({ x: 1 });
    res.send({ allBooks, allUsers, allRequests, success: true });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const { id, user } = req.body;
    Book.findByIdAndUpdate(
      id,
      {
        $set: {
          returnOn: Date.now() + 1000 * 60 * 60 * 24 * 7,
          borrowedBy: user,
          bookStatus: "borrowed",
        },
      },
      (err, book) => {
        if (err) {
          console.log(chalk.cyanBright(err));
          res.status(401).send({ success: false, err });
        }
        User.findByIdAndUpdate(
          user,
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
