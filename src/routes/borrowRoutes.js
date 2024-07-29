const express = require('express');
const { createBorrow, getBorrows, getBorrowById, updateBorrow, deleteBorrow } = require('../controllers/borrowController');
const router = express.Router();

router.post('/borrows', createBorrow);
router.get('/borrows', getBorrows);
router.get('/borrows/:id', getBorrowById);
router.put('/borrows/:id', updateBorrow);
router.delete('/borrows/:id', deleteBorrow);

module.exports = router;
