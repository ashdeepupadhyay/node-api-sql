const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//const db = require('./queries')

const port = 3000
const bookRoutes = require('./api/routes/Book');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

//app.get('/book/notRented', db.getBookList)
app.use('/book',bookRoutes);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })