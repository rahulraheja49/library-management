const router = require("express").Router();
const express = require("express");
const cors = require("cors");

const Book = require("../models/Book");
const Admin = require("../models/Admin");
const controller = require("../controllers/Admin");

const { viewReviews } = controller;

router.get("/viewReviews", viewReviews);

module.exports = router;
