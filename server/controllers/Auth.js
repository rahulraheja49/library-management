const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const chalk = require("chalk");

const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword);
    const { email, fullName } = req.body;

    User.findOne({ email }).then((currentUser) => {
      if (currentUser) {
        return res.send({
          msg: "User already exists, please log in instead",
          success: false,
        });
      } else {
        new User({
          email,
          fullName,
          password: securePassword,
        })
          .save()
          .then((newUser) => {
            console.log("new user is:", newUser);

            const token = jwt.sign(
              { id: newUser._id, username: newUser.username },
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
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.send({ status: "error", msg: "Invalid username/password" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
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
