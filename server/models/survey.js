
let mongoose = require('mongoose');

//create a model class
let surveyModel = mongoose.Schema({
  questionNum: Number,
  questionType: String,
  title: String,
  question: String,
  tf: String,
  creator: String,
  onOff: Boolean
},
{
  collection: "Survey"
});

module.exports = mongoose.model('Survey', surveyModel);