const express=require('express');

const router=express.Router();
const bookController = require('../controllers/Book');

router.get('/notRented',bookController.getBookList);
router.get('/:clientID',bookController.getBooksForClient);
router.post('/',bookController.updateBookReturn);
router.post('/selectBook',bookController.UPDATE_REGISTRATION_DATE_QUERY)
module.exports = router;