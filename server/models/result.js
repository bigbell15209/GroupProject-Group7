
let mongoose = require('mongoose');

//create a model class
let resultModel = mongoose.Schema({
  title: String, // title
  questionNum1: Number,
  questionNum2: Number,
  questionNum3: Number,
  questionType1: String, // True & False
  questionType2: String,
  questionType3: String,
  question1: String,
  question2: String,
  question3: String,
  tf1: String, // ?? answer 
  tf2: String, // ?? answer 
  tf3: String, // ?? answer 
  creator: String, // Survey Creator's id
  participant: String, // Participant's id
  writer: String, // Survey Creator's displayName
},
{
  collection: "results"
});

module.exports = mongoose.model('Result', resultModel);
