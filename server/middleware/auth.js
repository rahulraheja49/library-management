const jwt = require("jsonwebtoken");
const chalk = require("chalk");

const Admin = require("../models/Admin");
const User = require("../models/User");

exports.adminAuth = async (req, res, next) => {
  try {
    // Get the token from the header
    const token = req.header("x-auth-token");
    console.log(chalk.blue(token));

    // Check if no token
    if (!token) {
      console.log("No Token");
      return res
        .status(200)
        .json({ success: false, msg: "Please Sign-in to book a service!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_BCRYPT);
    console.log(decoded);
    const admin = await Admin.findById(decoded.id);
    req.admin = admin;
    res.locals.admin = admin;
    return next();
  } catch (err) {
    return res.status(401).json({ msg: "Authorization failed" });
  }
};

exports.userAuth = async (req, res, next) => {
  try {
    // Get the token from the header
    const token = req.header("x-auth-token");

    // Check if no token
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_BCRYPT);
    console.log(decoded);
    const user = await User.findById(decoded.id);
    req.user = user;
    res.locals.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ msg: "Authorization failed" });
  }
};
