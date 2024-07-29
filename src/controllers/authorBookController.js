const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create an authorBook
const createAuthorBook = async (req, res) => {
  const { name } = req.body;

  try {
    const newAuthorBook = await prisma.authorBook.create({
      data: {
        name,
      },
    });
    res.status(201).json(newAuthorBook);
  } catch (error) {
    console.error('Error creating authorBook:', error);
    res.status(500).json({ error: 'Error creating authorBook' });
  }
};

// Get all authorBooks
const getAllAuthorBooks = async (req, res) => {
  try {
    const authorBooks = await prisma.authorBook.findMany();
    res.json(authorBooks);
  } catch (error) {
    console.error('Error fetching authorBooks:', error);
    res.status(500).json({ error: 'Error fetching authorBooks' });
  }
};

// Get authorBook by ID
const getAuthorBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const authorBook = await prisma.authorBook.findUnique({
      where: { id: parseInt(id) },
      include: {
        books: true,
      },
    });

    if (!authorBook) {
      return res.status(404).json({ error: 'AuthorBook not found' });
    }

    res.json(authorBook);
  } catch (error) {
    console.error('Error fetching authorBook:', error);
    res.status(500).json({ error: 'Error fetching authorBook' });
  }
};

// Update an authorBook
const updateAuthorBook = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedAuthorBook = await prisma.authorBook.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    res.json(updatedAuthorBook);
  } catch (error) {
    console.error('Error updating authorBook:', error);
    res.status(500).json({ error: 'Error updating authorBook' });
  }
};

// Delete an authorBook
const deleteAuthorBook = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.authorBook.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting authorBook:', error);
    res.status(500).json({ error: 'Error deleting authorBook' });
  }
};

module.exports = {
  createAuthorBook,
  getAllAuthorBooks,
  getAuthorBookById,
  updateAuthorBook,
  deleteAuthorBook,
};
