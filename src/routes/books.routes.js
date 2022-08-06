const express = require("express");

const {
  getBooks,
  getSingleBook,
  addBook,
  deleteBook,
} = require("../controllers/books.controllers");

const router = express.Router();

router.get("/get-books", getBooks);
router.get("/get-book/:id", getSingleBook);
router.post("/add-book", addBook);
router.delete("/delete-book/:id", deleteBook);

module.exports = router;
