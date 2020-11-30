
let mongoose = require('mongoose');

//create a model class
let surveyModel = mongoose.Schema({
  questionNum1: Number,
  questionNum2: Number,
  questionNum3: Number,
  questionType1: String, // True & False
  questionType2: String,
  questionType3: String,
  title: String, // title
  question1: String,
  question2: String,
  question3: String,
  tf: String, // ?? answer 
  creator: String, // user._id = req.user(log in)
  writer: String, // user.displayname 
  onOff: Boolean // ?? use of survey
},
{
  collection: "Survey"
});

module.exports = mongoose.model('Survey', surveyModel);

