import { Book } from "../models/book.js";
import { handleError } from "../utils/error.js";
import { paginate } from "../utils/paginate.js";

const createABook = async (req, res) => {
  try {
    const newlyCreatedBook = await Book.create(req.body);

    if (newlyCreatedBook) {
      res.status(201).json({
        success: true,
        message: "Created Successfully",
        data: newlyCreatedBook,
      });
    }
  } catch (err) {
    handleError(err, res);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const result = await paginate(Book, req, {
      searchFields: ["name", "description"],
      defaultSort: { createdAt: -1 },
    }, 'Books');

    if (result?.data?.length > 0) {
      res.json(result);
    } else {
      res.status(404).json({
        success: false,
        message: "No Books found",
      });
    }
  } catch (err) {
    handleError(err, res);
  }
};

const getSingleBookById = async (req, res) => {
  try {
    const selectedBook = await Book.findById(req.params.id);

    if (selectedBook) {
      res.status(200).json({
        success: true,
        message: "Book Retrieved Successfully",
        data: selectedBook,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Book Not Found",
      });
    }
  } catch (err) {
    handleError(err, res);
  }
};

const updateSingleBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (err) {
    handleError(err, res);
  }
};

const deleteBookById = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: { id: deletedBook._id },
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const BookController = {
  createABook,
  getAllBooks,
  getSingleBookById,
  updateSingleBookById,
  deleteBookById,
};
