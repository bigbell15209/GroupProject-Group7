
let express = require('express');
let router = express.Router();
let mongoose=require('mongoose');
let passport=require('passport');

// create the visitor model instance
let visitorModel=require('../models/visitor');
let Visitor = visitorModel.Visitor; // alias
let Result = require('../models/result');
let Survey = require('../models/survey');


module.exports.displayHomePage = (req, res, next) => {

    let on = true;

    Survey.find({onOff: on},  (err, surveyList) => {
        if(err){
            return console.error(err);
        }else{

            res.render('index', 
            {title: 'Home', 
            SurveyList: surveyList, 
            displayName: req.user ? req.user.displayName : '',});
        }
    });
}


module.exports.displayParticipatePage = (req, res, next) => {

    let id = req.params.id; 

    Survey.findById(id, (err, surveyList) => {
        if(err){
            console.error(err);
            res.end(err);
        }else{

            res.render('joinSurvey/participate', 
            {title: 'Participate Survey', 
            SurveyList: surveyList,
            displayName: req.user ? req.user.displayName : '',});
        }

        
    });
}

module.exports.postParticipatePage = (req, res, next) => {
    let newResult = Result({
       "questionNum1": 1,
       "questionNum2": 2,
       "questionNum3": 3,
       "question1" : req.body.question,
       "question2" : req.body.question2,
       "question3" : req.body.question3,
       "questionType1" : req.body.questionType,
       "questionType2" : req.body.questionType2,
       "questionType3" : req.body.questionType3,
       "tf1" : req.body.tf,
       "tf2" : req.body.tf2,
       "tf3" : req.body.tf3,
       "title" : req.body.title,
       "participant_id": req.user._id, // logged in person's id
       "participant_dName" : req.user.displayName
    });

    Result.create(newResult, (err, Result) => {
      if(err){
          console.log(err);
          res.end(err);
      }else{
          // refresh the book list
          res.redirect('/');
      }
    });
}

module.exports.displayResultPage = (req, res, next) => {

    let title2 = req.params.id; 
    let alert = require('alert');

    
    Result.find({title: title2}, (err, resultList) => {
        if(err){
            console.error(err);
            res.end(err);
        }else if(resultList.length === 0){
            res.redirect('/survey-list');
            alert("This survey has no data.");
        }else{

            res.render('joinSurvey/result', 
            {title: 'result Survey', 
            ResultList: resultList,
            displayName: req.user ? req.user.displayName : '',});
        }

        
    });
}


//jiye




module.exports.displayAboutPage = (req, res, next) => {
    res.render('about',{ title: 'About Us',
    displayName: req.user ? req.user.displayName : ''});
}


module.exports.displayContactMePage = (req, res, next) => {
    res.render('contact',{ title: 'Contact Us',
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
         res.render('auth/login',
         {
             title: "Login",
             messages: req.flash('loginMessage'),
             displayName: req.user ? req.user.displayName: ''

         })
    }else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // server error?
        if(err)
        {
            return next(err);
        }
        // is there a visitor login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server error?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);

}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
  if(!req.user)
  {
      console.log("Here1");
      res.render('auth/register',
      {
          title: 'Register',
          messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName : ''
      });
  }
  else
  {
      console.log("Here2");
      return res.redirect('/');
  }

}

module.exports.processRegisterPage = (req, res, next) => {
   // instantiate a visitor object

   let newVisitor = new Visitor({
        username: req.body.username,
       //password cover
       //password: req.body,password,
       email: req.body.email,
       displayName: req.body.displayName
   });

   console.log(newVisitor);
   
   Visitor.register(newVisitor, req.body.password, (err) => { 
       if(err)
       {
           // seems no problem in data
           console.log('Error: Inserting New Visitor');
           if(err.name == "UserExistError")
           {
               req.flash(
                   'registerMessage',
                   'Registration Error: Visitor Already Exists!'
               );
               console.log('Error: Visitor Already Exists!')
           }
           return res.redirect('/register');
           
       }
       else
       {
           //if no error exists, then registration is successful

           // redirect the user and authenticate them

           return passport.authenticate('local')(req, res, () => {
           res.redirect('/survey-list')
           console.log('success register');
           });

       }
   })

}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/login');

}


