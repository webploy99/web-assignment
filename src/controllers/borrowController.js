const prisma = require('../config/db');

// Borrow a book
const createBorrow = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const borrow = await prisma.borrow.create({
      data: {
        userId,
        bookId,
        borrowDate: new Date(),
        returnDate: new Date(new Date().setDate(new Date().getDate() + 14)), // Return date is 14 days from today
      },
    });

    res.status(201).json({ message: 'Book borrowed successfully', borrow });
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ error: 'Error borrowing book' });
  }
};

// Get all borrows
const getBorrows = async (req, res) => {
  try {
    const borrows = await prisma.borrow.findMany({
      include: {
        user: true,
        book: {
          include: {
            author: true,
          },
        },
      },
    });

    res.json(borrows);
  } catch (error) {
    console.error('Error fetching borrows:', error);
    res.status(500).json({ error: 'Error fetching borrows' });
  }
};

// Get a single borrow by ID
const getBorrowById = async (req, res) => {
  const { id } = req.params;

  try {
    const borrow = await prisma.borrow.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        book: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!borrow) {
      return res.status(404).json({ error: 'Borrow not found' });
    }

    res.json(borrow);
  } catch (error) {
    console.error('Error fetching borrow:', error);
    res.status(500).json({ error: 'Error fetching borrow' });
  }
};

// Update a borrow
const updateBorrow = async (req, res) => {
  const { id } = req.params;
  const { userId, bookId } = req.body;

  try {
    const borrow = await prisma.borrow.update({
      where: { id: parseInt(id) },
      data: { userId, bookId },
    });

    res.json({ message: 'Borrow updated successfully', borrow });
  } catch (error) {
    console.error('Error updating borrow:', error);
    res.status(500).json({ error: 'Error updating borrow' });
  }
};

// Delete a borrow
const deleteBorrow = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.borrow.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Borrow deleted successfully' });
  } catch (error) {
    console.error('Error deleting borrow:', error);
    res.status(500).json({ error: 'Error deleting borrow' });
  }
};

module.exports = {
  createBorrow,
  getBorrows,
  getBorrowById,
  updateBorrow,
  deleteBorrow,
};
