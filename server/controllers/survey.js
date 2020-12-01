
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



// create a reference to the model
let Survey = require('../models/survey');
let Title = require('../models/result');
const { disable } = require('debug');



/* GET Survey List page. READ */
module.exports.displaySurveyList = (req, res, next) => {
   // find surveylist in the survey collection
    Survey.find({creator: req.user._id},(err, surveyList) => {
        if(err){
            return console.error(err);
        }else{

            res.render('createSurvey/list', 
            {title: 'Create Survey', 
            SurveyList: surveyList, 
            displayName: req.user ? req.user.displayName : '',});
        }
    });
    
}


module.exports.postSurveyList = (req, res, next) => {
    let newTitle = Title({
       "title": req.body.title,
       "creator": req.user._id, 
       "writer" : req.user.displayName,
       "onOff" : true
    });

    Title.create(newTitle, (err, Title) => {
      if(err){
          console.log(err);
          res.end(err);
      }else{
          console.log('save');
          res.redirect('/');
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
       "questionNum1": 1,
       "questionNum2": 2,
       "questionNum3": 3,
       "question1" : req.body.question,
       "question2" : req.body.question2,
       "question3" : req.body.question3,
       "questionType1" : req.body.questionType,
       "questionType2" : req.body.questionType2,
       "questionType3" : req.body.questionType3,
       "title" : req.body.title,
       "creator": req.user._id, // logged in person's id
       "writer" : req.user.displayName,
       "onOff" : true
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
        "questionNum1": 1,
        "questionNum2": 2,
       "questionNum3": 3,
       "question1" : req.body.question1,
       "question2" : req.body.question2,
       "question3" : req.body.question3,
       "questionType1" : req.body.questionType,
       "questionType2" : req.body.questionType2,
       "questionType3" : req.body.questionType3,
       "title" : req.body.title,

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


module.exports.displayOnOffPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, OnOffSurvey) => {
       if(err){
           console.log(err);
           res.end(err);
       }else{
           //show the onoff view
           res.render('createSurvey/onoff', {
               title: '', 
               survey: OnOffSurvey,
               displayName: req.user ? req.user.displayName : ''})
       }
    });

}

module.exports.processingOnOffPage = (req, res, next) => {
    let id = req.params.id;

    let updatedOnOff = Survey({
        "_id": id,
        "onOff": req.body.onOff

    });

    Survey.updateOne({_id: id}, updatedOnOff, (err) => {
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

module.exports.displaySettingPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToSetting) => {
       if(err){
           console.log(err);
           res.end(err);
       }else{
           //show the edit view
           res.render('createSurvey/setting', {
               title: 'Edit Question', 
               setting: surveyToSetting,
               displayName: req.user ? req.user.displayName : ''})
       }
    });

}

module.exports.processingSettingPage = (req, res, next) => {
    let id = req.params.id;

    let updatedServey = Survey({
        "_id": id,
        "onOff" : req.body.onAndOff
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

