let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our user model 
let User = require('../models/user');

let userController = require('../controllers/user');

// create route // get route for the user list page - read operaton
router.get('/', userController.displayBookList);

// get route for displaying add page - create operation
router.get('/add', userController.displayAddPage);

// post route for processing add page - create operation
router.post('/add', userController.processingAddPage);

// get route for displaying edit page - update operation
router.get('/edit/:id', userController.displayEditPage);

// post route for processing edit page - update operation
router.post('/edit/:id', userController.processingEditPage);


// get to perform deletion - delete operation
router.get('/delete/:id', userController.performDeletion);

module.exports = router;