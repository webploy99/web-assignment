const express = require('express');
const { createAuthorBook, getAllAuthorBooks, getAuthorBookById, updateAuthorBook, deleteAuthorBook } = require('../controllers/authorBookController');

const router = express.Router();

router.post('/authorBooks', createAuthorBook);
router.get('/authorBooks', getAllAuthorBooks);
router.get('/authorBooks/:id', getAuthorBookById);
router.put('/authorBooks/:id', updateAuthorBook);
router.delete('/authorBooks/:id', deleteAuthorBook);

module.exports = router;