const router = require("express").Router();
const express = require("express");
const cors = require("cors");

const Book = require("../models/Book");
const controller = require("../controllers/Book");

const { borrowBook, addBook, findAllAvailableBooks, requestBook, returnBook } =
  controller;

const { userAuth, adminAuth } = require("../middleware/auth");

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: false }));

router.post("/borrowBook", userAuth, borrowBook);

router.post("/addBook", addBook);

router.get("/findAllAvailableBooks", findAllAvailableBooks);

router.post("/requestBook", userAuth, requestBook);

router.post("/returnBook", adminAuth, returnBook);

module.exports = router;
