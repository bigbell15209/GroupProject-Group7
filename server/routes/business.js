let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let businessController = require('../controllers/business');

function requireAuth(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

router.get('/', businessController.DisplayBusinessList);
  
router.get('/add', requireAuth, businessController.DisplayAddPage);

router.post('/add', requireAuth, businessController.ProcessAddPage);

router.get('/edit/:id', requireAuth, businessController.DisplayEditPage);

router.post('/edit/:id', requireAuth, businessController.ProcessEditPage);

router.get('/delete/:id', requireAuth, businessController.ProcessDeletePage);


module.exports = router;