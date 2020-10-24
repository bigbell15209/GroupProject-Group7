/*
File Name: Assignment2
Student's Name: Eunbee Lee
Student ID: 301083645
Date: 2020 Oct 24th
 */


let express = require('express');
let router = express.Router();
let mongoose=require('mongoose');
let passport=require('passport');

// create the visitor model instance
let visitorModel=require('../models/visitor');
let Visitor = visitorModel.Visitor; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home',
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about',{ title: 'About Me',
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects',{ title: 'Projects',
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('services',{ title: 'Services',
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactMePage = (req, res, next) => {
    res.render('contact',{ title: 'Contact Me',
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
            return res.redirect('/user-list');
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
           res.redirect('/user-list')
           console.log('success register');
           });

       }
   })

}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/login');

}


/* 

// Error that I made ( req.visitor -> req.user)

let express = require('express');
let router = express.Router();
let mongoose=require('mongoose');
let passport=require('passport');

// create the visitor model instance
let visitorModel=require('../models/visitor');
let Visitor = visitorModel.Visitor; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home',
    displayName: req.visitor ? req.visitor.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about',{ title: 'About Me',
    displayName: req.visitor ? req.visitor.displayName : ''});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects',{ title: 'Projects',
    displayName: req.visitor ? req.visitor.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('services',{ title: 'Services',
    displayName: req.visitor ? req.visitor.displayName : ''});
}

module.exports.displayContactMePage = (req, res, next) => {
    res.render('contact',{ title: 'Contact Me',
    displayName: req.visitor ? req.visitor.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in

    if(!req.visitor)
    {
         res.render('auth/login',
         {
             title: "Login",
             messages: req.flash('loginMessage'),
             displayName: req.visitor ? req.visitor.displayName: ''

         })
    }else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, visitor, info) => {
        // server error?
        if(err)
        {
            return next(err);
        }
        // is there a visitor login error?
        if(!visitor)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(visitor, (err) => {
            //server error?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/user-list');
        });
    })(req, res, next);

}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
  if(!req.visitor)
  {
      console.log("Here1");
      res.render('auth/register',
      {
          title: 'Register',
          messages: req.flash('registerMessage'),
          displayName: req.visitor ? req.visitor.displayName : ''
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
   console.log("Here3");
   let newVisitor = new Visitor({
       visitorname: req.body.visitorname,
       //password cover
       //password: req.body,password,
       email: req.body.email,
       displayName: req.body.displayName
   });
   
   Visitor.register(newVisitor, req.body.password, (err) => { 
       if(err)
       {
           // seems no problem in data
           console.log("Error: Inserting new visitor");
           console.log(newVisitor.visitorname);
           console.log(newVisitor.email);
           console.log(newVisitor.displayName);
           console.log(req.body.password);
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
           res.redirect('/user-list')
           console.log('success register');
           });

       }
   })

}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/login');

}

*/