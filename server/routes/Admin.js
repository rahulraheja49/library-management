const router = require("express").Router();

const controller = require("../controllers/Admin");
const { adminAuth } = require("../middleware/auth");

const {
  viewReviews,
  login,
  signup,
  getBorrowedBooksList,
  findAllAvailableBooksAndUsersAndRequests,
  borrowBook,
} = controller;

router.get("/viewReviews", adminAuth, viewReviews);

router.post("/signup", signup);

router.post("/login", login);

router.get("/getBorrowedBooksList", adminAuth, getBorrowedBooksList);

router.get(
  "/findAllAvailableBooksAndUsersAndRequests",
  adminAuth,
  findAllAvailableBooksAndUsersAndRequests
);

router.post("/borrowBook", adminAuth, borrowBook);

module.exports = router;
