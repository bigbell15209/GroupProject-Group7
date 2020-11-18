

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



// create a reference to the model
let Survey = require('../models/survey');


module.exports.displayBookList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err){
            return console.error(err);
        }else{

            res.render('createSurvey/list', 
            {title: 'Create Survey', 
            SurveyList: surveyList, 
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('createSurvey/add', {
        title: 'Add List',
        displayName: req.user ? req.user.displayName : ''});
}

module.exports.processingAddPage = (req, res, next) => {
    let newSurvey = Survey({
       "questionNum": req.body.questionNumber,
       "question" : req.body.question,
       "questionType" : req.body.questionType
    });

    Survey.create(newSurvey, (err, Survey) => {
      if(err){
          console.log(err);
          res.end(err);
      }else{
          // refresh the book list
          res.redirect('/survey-list');
      }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
       if(err){
           console.log(err);
           res.end(err);
       }else{
           //show the edit view
           res.render('createSurvey/edit', {
               title: 'Edit Question', 
               survey: surveyToEdit,
               displayName: req.user ? req.user.displayName : ''})
       }
    });

}

module.exports.processingEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedServey = Survey({
        "_id": id,
        "questionNum": req.body.questionNum,
        "question" : req.body.question,
        "questionType" : req.body.questionType

    });

    Survey.updateOne({_id: id}, updatedServey, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            // refresh the user list
            res.redirect('/survey-list');
        }
    });
}

module.exports.performDeletion = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
    if(err){
        console.log(err);
        res.end(err);
    }else{
        // refresh the user list
        res.redirect('/survey-list');
    }
    });

}
