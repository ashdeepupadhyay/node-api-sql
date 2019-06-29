const Pool = require('pg').Pool
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL

})
pool.on('connect', () => {
    console.log('connected to the db');
  });
  const BOOK_LIST_FOR_RENTING = 'select book_id,book_name,book_author,category_name as category from public.book b inner join public.category cat on cat.category_id=b.category_id where client_id is null and rent_date is null'

const getBookList = (request, response) => {
    console.log("in get users");
    pool.query(BOOK_LIST_FOR_RENTING, (error, results) => {
      if (error) {
        throw errors
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getBookList
  }