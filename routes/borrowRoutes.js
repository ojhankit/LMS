const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");
const { verifyToken } = require("../middleware/auth");

// Member-only routes (just use verifyToken, and check role inside controller if needed)
router.post("/borrow/:bookId", verifyToken, borrowController.borrowBook);
router.post("/return/:bookId", verifyToken, borrowController.returnBook);

module.exports = router;
