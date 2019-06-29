const express=require('express');

const router=express.Router();
const bookController = require('../controllers/Book');

router.get('/notRented',bookController.getBookList);
router.get('/:clientID',bookController.getBooksForClient);

module.exports = router;