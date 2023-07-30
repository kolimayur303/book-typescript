// src/routes.ts
import { Router, Request, Response } from "express";
import Book, { IBook } from "./models/book";

const router = Router();

// Create a new book
router.post("/books", async (req: Request, res: Response) => {
  try {
    const { title, author, ISBN } = req.body;
    const newBook: IBook = new Book({ title, author, ISBN });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all books
router.get("/books", async (req: Request, res: Response) => {
  try {
    const books: IBook[] = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a book by ID
router.get("/books/:id", async (req: Request, res: Response) => {
  try {
    const bookId: string = req.params.id;
    const book: IBook | null = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json(book);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a book by ID
router.put("/books/:id", async (req: Request, res: Response) => {
  try {
    const bookId: string = req.params.id;
    const { title, author, ISBN } = req.body;

    const updatedBook: IBook | null = await Book.findByIdAndUpdate(
      bookId,
      { title, author, ISBN },
      { new: true }
    );

    if (!updatedBook) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json(updatedBook);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a book by ID
router.delete("/books/:id", async (req: Request, res: Response) => {
  try {
    const bookId: string = req.params.id;
    const deletedBook: IBook | null = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json(deletedBook);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
