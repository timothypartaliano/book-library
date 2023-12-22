const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Book API v1 ready to go",
        status: "SUCCESS",
    });
});

router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);

module.exports = router;