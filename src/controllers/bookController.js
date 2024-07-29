const prisma = require('../config/db');

// Create a new book
const createBook = async (req, res) => {
  const { title, authorId } = req.body;

  try {
    const book = await prisma.book.create({
      data: {
        title,
        authorId,
      },
    });

    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Error creating book' });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: true,  // Include the author information
      },
    });

    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Error fetching books' });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Error fetching book' });
  }
};
// Update a book
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, authorId } = req.body;

  try {
    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: { title, authorId },
    });

    res.json({ message: 'Book updated successfully', book });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Error updating book' });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.book.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Error deleting book' });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
