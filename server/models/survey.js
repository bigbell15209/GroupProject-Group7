
let mongoose = require('mongoose');

//create a model class
let surveyModel = mongoose.Schema({
  questionNum: Number,
  questionType: String, // True & False 
  title: String, // title
  question: String,
  tf: String, 
  creator: String, // user._id = req.user(log in)
  writer: String, // user.displayname 
  onOff: Boolean // use of survey
},
{
  collection: "Survey"
});

module.exports = mongoose.model('Survey', surveyModel);