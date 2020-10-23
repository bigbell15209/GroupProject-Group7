let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let userController = require('../controllers/user');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/*
// connect to our user model 
let User = require('../models/user');

let userController = require('../controllers/user');
*/

// create route // get route for the user list page - read operaton
router.get('/',  userController.displayBookList);

// get route for displaying add page - create operation
router.get('/add', requireAuth, userController.displayAddPage);

// post route for processing add page - create operation
router.post('/add', requireAuth, userController.processingAddPage);

// get route for displaying edit page - update operation
router.get('/edit/:id', requireAuth, userController.displayEditPage);

// post route for processing edit page - update operation
router.post('/edit/:id', requireAuth, userController.processingEditPage);


// get to perform deletion - delete operation
router.get('/delete/:id', requireAuth, userController.performDeletion);

module.exports = router;