const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bookRoutes = require('./src/routes/book')
const sequelize = require('./src/config/connection')
const Book = require('./src/models/book')

app.use(express.json())
app.use('/', bookRoutes)

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synchronized')
    })
    .catch((error) => {
        console.error('Error synchronizing database:', error)
    })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})