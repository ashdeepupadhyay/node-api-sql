const Pool = require('pg').Pool
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})
pool.on('connect', () => {
    console.log('connected to the db');
  });
const getUsers = (request, response) => {
    console.log("in get users");
    pool.query('SELECT * FROM book', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getUsers
  }