const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Public route
router.get("/", bookController.getAllBook);
router.get("/:id", bookController.getBookById)

// Admin only routes
router.post("/", verifyToken, isAdmin, bookController.createBook);
router.put("/:id", verifyToken, isAdmin, bookController.updateBook);
router.delete("/:id", verifyToken, isAdmin, bookController.deleteBook);

module.exports = router
