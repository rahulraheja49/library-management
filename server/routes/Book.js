const router = require("express").Router();
const express = require("express");
const cors = require("cors");

const Book = require("../models/Book");
const controller = require("../controllers/Book");

const { borrowBook, addBook, findAllBooks, requestBook, returnBook } =
  controller;

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: false }));

router.post("/borrowBook", borrowBook);

router.post("/addBook", addBook);

router.post("/findAllBooks", findAllBooks);

router.post("/requestBook", requestBook);

router.post("/returnBook", returnBook);

module.exports = router;
