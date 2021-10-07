const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

const Request = mongoose.model("request", requestSchema);

module.exports = Request;
