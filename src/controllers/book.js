const db = require('../config/connection')
const response = require('../utils/response')

exports.getAllBooks = (req, res) => {
    const sql = "SELECT * FROM books"

    db.query(sql, (err, fields) => {
        if (err) throw err;
        response(200, fields, "Get All Books", res)
    })
}

exports.getBookById = (req, res) => {
    const bookId = req.params.id;
    const sql = "SELECT * FROM books WHERE id = $1"

    db.query(sql, [bookId], (err, result) => {
        if (err) {
            console.log(err)
            response(500, null, "Internal Server Error", res)
        } else if (result.rows.length === 0) {
            response(404, null, "Book not found", res)
        } else {
            response(200, result.rows[0], "Get Book by ID", res)
        }
    })
}