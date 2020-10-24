let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

let Business = require('../models/business');

module.exports.DisplayBusinessList = (req, res, next) => {
  
    Business.Model.find( (err, data) => {
      if(err)
      {
        console.error(err);
        res.end()
      }
  
      res.render('index', { title: 'Business List', business: data,
      displayName: req.user ? req.user.displayName : ''  });
    });
    
  }

module.exports.DisplayAddPage = (req, res, next)=> {
    res.render('index', { title: 'Add Business',
    displayName: req.user ? req.user.displayName : '' });
}

module.exports.ProcessAddPage = (req, res, next)=> {

    let business = Business.Model({
        "company":req.body.company,
        "name": req.body.name,
        "email": req.body.email,
        "number": req.body.number
    });

    Business.Model.create(business, (err, Business) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/Business-list');
    });
}

module.exports.DisplayEditPage = (req, res, next)=> {
    let id = req.params.id;

    Business.Model.findById(id, (err, BusinessToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.render('index', 
        { title: 'Edit Business Contact', data: BusinessToEdit,
        displayName: req.user ? req.user.displayName : '' });
    });
}

module.exports.ProcessEditPage = (req, res, next)=> {
    let id = req.params.id;

     let updatedBusiness = Business.Model({
        "_id": id, 
        "company":req.body.company,
        "name": req.body.name,
        "email": req.body.email,
        "number": req.body.number
    });

    Business.Model.updateOne({_id: id}, updatedBusiness, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/business-list');
    });
}

module.exports.ProcessDeletePage = (req, res, next)=> {
    let id = req.params.id;

    Business.Model.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/business-list');
    });
}