// const db = require('../config/connection')
const sequelize = require('../config/connection');
const response = require('../utils/response')
const Book = require('../models/book')

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({ where: {} });
        response(200, books, "Get All Books", res)
    } catch (error) {
        console.error(error)
        response(500, null, "Internal Server Error", res)
    }
}

exports.getBookById = async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await Book.findByPk(bookId);
        if (!book) {
            response(404, null, "Book not found", res);
        } else {
            response(200, book.toJSON(), "Get Book by ID", res);
        }
    } catch (error) {
        console.error('Error fetching book by ID:', error);
        response(500, null, "Internal Server Error", res);
    }
};

exports.addBook = async (req, res) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading
    } = req.body

    try {
        const newBook = await Book.create({
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading
        })
        response(201, newBook.toJSON(), "Book added successfully", res)
    } catch (error) {
        console.log('Error adding book:', error)
        response(500, null, "Internal Server Error", res)
    }
}

exports.editBookById = async (req, res) => {
    const bookId = req.params.id

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading
    } = req.body

    try {
        const [rowsAffected, updatedBooks] = await Book.update({
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt: new Date()
        }, {
            where: { id: bookId },
            returning: true
        })

        if (rowsAffected == 0) {
            response(404, null, "Book not found", res)
        } else {
            response(200, updatedBooks[0].toJSON(), "Book updated successfully", res)
        }
    } catch (error) {
        console.error('Error updating book:', error)
        response(500, null, "Internal Server Error", res)
    }
}

exports.deleteBookById = async (req, res) => {
    const bookId = req.params.id

    try {
        const bookToDelete = await Book.findByPk(bookId)


        if (!bookToDelete) {
            response(404, null, "Book not found", res)
            return
        }

        await Book.destroy({
            where: { id: bookId},
        })

        response(200, bookToDelete.toJSON(),"Book deleted successfully", res)
    } catch (error) {
        console.error('Error deleting book:', error)
        response(500, null, "Internal Server Error", res)
    }
}

/*Function deleteById using native query option */
// exports.deleteBookById = (req, res) => {
//     const bookId = req.params.id

//     const sql = `
//         DELETE FROM books
//         WHERE id = $1
//         RETURNING *
//     `

//     db.query(sql, [bookId], (err, result) => {
//         if (err) {
//             console.error(err)
//             response(500, null, "Internal Server Error", res)
//         } else if (result.rows.length === 0) {
//             response(404, null, "Book not found", res)
//         } else {
//             response(200, result.rows[0], "Book deleted successfully", res)
//         }
//     })
// }