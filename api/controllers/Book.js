const Pool = require('pg').Pool
const dotenv = require('dotenv');


// parse application/json

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL

})
pool.on('connect', () => {
    console.log('connected to the db');
  });

const BOOK_LIST_FOR_RENTING = 'select book_id,book_name,book_author,category_name as category from public.book b inner join public.category cat on cat.category_id=b.category_id where client_id is null and rent_date is null'
const BOOK_LIST_FOR_CLIENT = 'select book_id,book_name,book_author,rent_date,no_of_release_days,init_days_price,fixed_days_price,category_name as category from public.book b inner join public.category cat on cat.category_id=b.category_id where client_id='

exports.getBookList = (request, response,next) => {
    console.log("in get users");
    pool.query(BOOK_LIST_FOR_RENTING, (error, results) => {
      if (error) {
        throw errors
      }
      response.status(200).json(results.rows)
    })
  }

  exports.getBooksForClient= (req,res,next)=>{
    const query = {
        text: "select book_id,book_name,book_author,rent_date,no_of_release_days,init_days_price,fixed_days_price,category_name as category from public.book b inner join public.category cat on cat.category_id=b.category_id where client_id=$1",
        values: [req.params.clientID]
    }
      pool.query(query, (error, results) => {
        if (error) {
          throw errors
        }
        res.status(200).json(results.rows)
      })
  }

exports.updateBookReturn = (req,res,next)=>{
    const query={
        text : "update public.book set rent_date=null,client_id=null where book_id=$1",
        values:[req.body.bookid]
    }
    pool.query(query,(error,results)=>{
        if(error){
            throw errors
        }
        res.status(200).json(results.rows)
    })
}

exports.UPDATE_REGISTRATION_DATE_QUERY = (req,res,next)=>{
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today=yyyy+'-'+mm+'-'+dd;
console.log(today);
console.log(req.body.clientid);

    const query={
        text:"update public.book set rent_date=$1,client_id=$2 where book_id=$3",
        values:[today,req.body.clientid,req.body.bookid]
    }
    pool.query(query,(error,results)=>{
        if(error){
            throw error
        }
        res.status(200).json(results.rows);
    })
}