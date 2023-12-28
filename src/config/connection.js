const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Connected to the database successfully'))
  .catch((error) => console.error('Error connecting to the database:', error));

module.exports = sequelize;

/*Connect using postgres option*/
// const { Client } = require('pg')
// const dotenv = require('dotenv')

// dotenv.config();
 
// const client = new Client({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// })

// client.connect()
//   .then(() => console.log('Connected to the database'))
//   .catch(error => console.error('Error connecting to the database', error))

// module.exports = client