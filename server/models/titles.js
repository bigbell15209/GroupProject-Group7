
let mongoose = require('mongoose');

//create a model class
let titleModel = mongoose.Schema({
  title: String, // title
  creator: String, // user._id = req.user(log in)
  writer: String, // user.displayname 
  onOff: Boolean // ?? use of survey
},
{
  collection: "titles"
});

module.exports = mongoose.model('Title', titleModel);