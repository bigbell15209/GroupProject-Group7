/*
File Name: Assignment2
Student's Name: Eunbee Lee
Student ID: 301083645
Date: 2020 Oct 24th
 */

let mongoose = require('mongoose');

//create a model class
let userModel = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  name: String,
  number: String
},
{
  collection: "user"
});

module.exports = mongoose.model('User', userModel);