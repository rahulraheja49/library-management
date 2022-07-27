require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const app = express();
const http = require("http").Server(app);
const db = require("./config/db");
const Auth = require("./routes/Auth");
const Book = require("./routes/Book");
const User = require("./routes/User");
const Admin = require("./routes/Admin");

db();
app.use(cors());
app.use(morgan("dev"));
app.use(cors());
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/auth", Auth);
app.use("/api/books", Book);
app.use("/api/users", User);
app.use("/api/admins", Admin);

const PORT = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

// app.get("/", (req, res) => {
//   res.json({ Msg: "Library management system" });
// });

http.listen(PORT, () => {
  console.log(chalk.blue(`Listening on port ${PORT}`));
});
