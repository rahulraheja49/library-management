const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  fullName: {
    type: String,
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
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
