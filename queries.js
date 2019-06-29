const Pool = require('pg').Pool
const pool = new Pool({
    connectionString: "postgres://postgres:123456789@127.0.0.1:5432/bookRentelDB"
    /*
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: '123456789',
  port: 5432
  */
})
//postgres://postgres@127.0.0.1:5432/bookRentelDB
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