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

            res.render('user', {title: 'User List', UserList: userList})
        }
    });
});

module.exports = router;