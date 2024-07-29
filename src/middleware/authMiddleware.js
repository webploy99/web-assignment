const prisma = require('../config/db');

// Create a new author
const createAuthor = async (req, res) => {
  const { name } = req.body;

  try {
    const author = await prisma.author.create({
      data: { name },
    });

    res.status(201).json({ message: 'Author created successfully', author });
  } catch (error) {
    console.error('Error creating author:', error);
    res.status(500).json({ error: 'Error creating author' });
  }
};

// Get all authors
const getAuthors = async (req, res) => {
  try {
    const authors = await prisma.author.findMany();
    res.json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ error: 'Error fetching authors' });
  }
};

// Get a single author by ID
const getAuthorById = async (req, res) => {
  const { id } = req.params;

  try {
    const author = await prisma.author.findUnique({
      where: { id: parseInt(id) },
    });

    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(author);
  } catch (error) {
    console.error('Error fetching author:', error);
    res.status(500).json({ error: 'Error fetching author' });
  }
};

// Update an author
const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const author = await prisma.author.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    res.json({ message: 'Author updated successfully', author });
  } catch (error) {
    console.error('Error updating author:', error);
    res.status(500).json({ error: 'Error updating author' });
  }
};

// Delete an author
const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.author.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Author deleted successfully' });
  } catch (error) {
    console.error('Error deleting author:', error);
    res.status(500).json({ error: 'Error deleting author' });
  }
};

module.exports = {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
