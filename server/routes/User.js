const router = require("express").Router();
const express = require("express");
const cors = require("cors");

const controller = require("../controllers/User");

const { getUserDetails, getAllReviews, submitReview } = controller;

const { userAuth } = require("../middleware/auth");

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: false }));

router.get("/getUserDetails", userAuth, getUserDetails);
router.get("/getAllReviews", getAllReviews);
router.post("/submitReview", userAuth, submitReview);

module.exports = router;
