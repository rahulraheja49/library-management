const router = require("express").Router();
const express = require("express");
const cors = require("cors");

const User = require("../models/User");
const controller = require("../controllers/User");

const { getBorrowedBooks } = controller;

const { userAuth } = require("../middleware/auth");

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: false }));

router.get("/getBorrowedBooks", userAuth, getBorrowedBooks);

module.exports = router;
