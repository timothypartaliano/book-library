const { Client } = require('pg')
 
const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'book_api',
  user: 'postgres',
  password: 'timothy',
})

client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(error => console.error('Error connecting to the database', error))

module.exports = client