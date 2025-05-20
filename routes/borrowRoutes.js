const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");
const { verifyToken, isMember, isLibrarian } = require("../middleware/authMiddleware");

// Member-only routes
router.post("/borrow/:bookId", verifyToken, isMember, borrowController.borrowBook);
router.post("/return/:bookId", verifyToken, isMember, borrowController.returnBook);

//Librarian routes
router.get("/borrowed-books/",verifyToken,isLibrarian,borrowController.getBorrowedBooks)
router.get("/returned-books/",verifyToken,isLibrarian,borrowController.getReturnedBooks)

module.exports = router
