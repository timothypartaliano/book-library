const db = require('../config/connection')
const response = require('../utils/response')

exports.getAllBooks = (req, res) => {
    const sql = "SELECT * FROM books"

    db.query(sql, (err, fields) => {
        if (err) throw err;
        response(200, fields, "Get All Books", res)
    })
}