const router = require("express").Router();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const controller = require("../controllers/Auth");

const { signup, login } = controller;

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: false }));

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
