const router = require("express").Router();

const controller = require("../controllers/Book");

const { borrowBook, addBook, findAllAvailableBooks, requestBook, returnBook } =
  controller;

const { userAuth, adminAuth } = require("../middleware/auth");

router.post("/borrowBook", userAuth, borrowBook);

router.post("/addBook", adminAuth, addBook);

router.get("/findAllAvailableBooks", findAllAvailableBooks);

router.post("/requestBook", userAuth, requestBook);

router.post("/returnBook", adminAuth, returnBook);

module.exports = router;
