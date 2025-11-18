import { Router } from "express";
import { BookController } from "../controllers/books.controller.js";
import { validateBookId } from "../middleware/validation.js";
const {
  createABook,
  getAllBooks,
  getSingleBookById,
  updateSingleBookById,
  deleteBookById,
} = BookController;

const router = Router();

// Create a Single Book
router.post("/", createABook);

// GET all books
router.get("/", getAllBooks);

// GET a Single Book
router.get("/:id", validateBookId, getSingleBookById);

// Update a Single Book
router.put("/:id", validateBookId, updateSingleBookById);

// Delete a Single Book
router.delete("/:id", validateBookId, deleteBookById);

export default router;
