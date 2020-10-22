let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



// create a reference to the model
let User = require('../models/user');


module.exports.displayBookList = (req, res, next) => {
    User.find((err, userList) => {
        if(err){
            return console.error(err);
        }else{
            //console.log(UserList);

            res.render('user/list', {title: 'Contacts', UserList: userList});
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('user/add', {title: 'Add List'});
}

module.exports.processingAddPage = (req, res, next) => {
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
}

module.exports.displayEditPage = (req, res, next) => {
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

}

module.exports.processingEditPage = (req, res, next) => {
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
}

module.exports.performDeletion = (req, res, next) => {
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

}