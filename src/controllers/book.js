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

/*Function getAll using native query option*/
// exports.getAllBooks = (req, res) => {
//     const sql = "SELECT * FROM books"

//     db.query(sql, (err, fields) => {
//         if (err) throw err;
//         response(200, fields, "Get All Books", res)
//     })
// }

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

/*Function getById using native query option */
// exports.getBookById = (req, res) => {
//     const bookId = req.params.id;
//     const sql = "SELECT * FROM books WHERE id = $1"

//     db.query(sql, [bookId], (err, result) => {
//         if (err) {
//             console.log(err)
//             response(500, null, "Internal Server Error", res)
//         } else if (result.rows.length === 0) {
//             response(404, null, "Book not found", res)
//         } else {
//             response(200, result.rows[0], "Get Book by ID", res)
//         }
//     })
// }

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

/*Function addBook using native query option */
// exports.addBook = (req, res) => {
//     const {
//         name,
//         year,
//         author,
//         summary,
//         publisher,
//         pageCount,
//         readPage,
//         finished,
//         reading
//     } = req.body

//     const sql = `
//         INSERT INTO books (
//             name,
//             year,
//             author,
//             summary,
//             publisher,
//             pageCount,
//             readPage,
//             finished,
//             reading
//         )
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//         RETURNING *
//     `

//     const values = [
//         name,
//         year,
//         author,
//         summary,
//         publisher,
//         pageCount,
//         readPage,
//         finished,
//         reading
//     ]

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error(err);
//             response(500, null, "Internal Server Error", res)
//         } else {
//             response(201, result.rows[0], "Book added successfully", res)
//         }
//     })
// }

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

/*Function editById using native query option */
// exports.editBookById = (req, res) => {
//     const bookId = req.params.id

//     const {
//         name,
//         year,
//         author,
//         summary,
//         publisher,
//         pageCount,
//         readPage,
//         finished,
//         reading
//     } = req.body

//     const sql = `
//         UPDATE books
//         SET
//             name = $1,
//             year = $2,
//             author = $3,
//             summary = $4,
//             publisher = $5,
//             pageCount = $6,
//             readPage = $7,
//             finished = $8,
//             reading = $9,
//             updatedAt = CURRENT_TIMESTAMP
//         WHERE id = $10
//         RETURNING *
//     `

//     const values = [
//         name,
//         year,
//         author,
//         summary,
//         publisher,
//         pageCount,
//         readPage,
//         finished,
//         reading,
//         bookId
//     ]

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error(err)
//             response(500, null, "Internal Server Error", res)
//         } else if (result.rows.length === 0) {
//             response(404, null, "Book not found", res)
//         } else {
//             response(200, result.rows[0], "Book updated successfully", res)
//         }
//     })
// }

exports.deleteBookById = (req, res) => {
    const bookId = req.params.id

    const sql = `
        DELETE FROM books
        WHERE id = $1
        RETURNING *
    `

    db.query(sql, [bookId], (err, result) => {
        if (err) {
            console.error(err)
            response(500, null, "Internal Server Error", res)
        } else if (result.rows.length === 0) {
            response(404, null, "Book not found", res)
        } else {
            response(200, result.rows[0], "Book deleted successfully", res)
        }
    })
}