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