import mongoose from "mongoose";

// Mongoose is an object document mapper sitting ontop MongoDB driver which provides solutions with schema, validations etc. Similar to Prisma used as an ORM for SQL databases,  
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      maxLength: [100, "Book title cannot be more than 100 characters"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Publication Year is required"],
      min: [1000, "Year must be at least 1000"],
      max: [new Date().getFullYear(), "Year cannot exceed current year"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
