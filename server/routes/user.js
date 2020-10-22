let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our user model 
let User = require('../models/user');

// create route // get route for the user list page - read operaton
router.get('/', (req, res, next) => {
    User.find((err, userList) => {
        if(err){
            return console.error(err);
        }else{
            //console.log(UserList);

            res.render('user/list', {title: 'Contacts', UserList: userList});
        }
    });
});

// get route for displaying add page - create operation
router.get('/add', (req, res, next) => {
    res.render('user/add', {title: 'Add List'});
});

// post route for processing add page - create operation
router.post('/add', (req, res, next) => {
    let newUser = User({
       "name" : req.body.name,
       "email" : req.body.email,
       "number" : req.body.number
    });

    User.create(newUser, (err, User) => {
      if(err){
          console.log(err);
          res.end(err);
      }else{
          // refresh the book list
          res.redirect('/user-list');
      }
    });
});

// get route for displaying edit page - update operation
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    User.findById(id, (err, userToEdit) => {
       if(err){
           console.log(err);
           res.end(err);
       }else{
           //show the edit view
           res.render('user/edit', {title: 'Edit Contact', user: userToEdit})
       }
    });

});

// post route for processing edit page - update operation
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedUser = User({
        "_id": id,
        "name" : req.body.name,
        "email" : req.body.email,
        "number" : req.body.number

    });

    User.updateOne({_id: id}, updatedUser, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            // refresh the user list
            res.redirect('/user-list');
        }
    });
});


// get to perform deletion - delete operation
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    User.remove({_id: id}, (err) => {
    if(err){
        console.log(err);
        res.end(err);
    }else{
        // refresh the user list
        res.redirect('/user-list');
    }
    });

});

module.exports = router;