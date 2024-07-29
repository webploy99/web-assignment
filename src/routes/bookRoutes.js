const express = require('express');

const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const router = express.Router();

router.post('/books', createBook);
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

module.exports = router;
