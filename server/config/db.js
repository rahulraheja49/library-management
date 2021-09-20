const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(chalk.magenta("Mongodb Connected ...."));
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

module.exports = connectDB;
