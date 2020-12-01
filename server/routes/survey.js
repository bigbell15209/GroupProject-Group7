

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let surveyController = require('../controllers/survey');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


// create route // get route for the survey page - read operaton
router.get('/', requireAuth, surveyController.displaySurveyList);

// post route for processing survey page - post operation
router.post('/', requireAuth, surveyController.postSurveyList);

// get route for displaying add page - create operation
router.get('/add', requireAuth, surveyController.displayAddPage);

// post route for processing add page - create operation
router.post('/add', requireAuth, surveyController.processingAddPage);

// get route for displaying edit page - update operation
router.get('/edit/:id', requireAuth, surveyController.displayEditPage);

// post route for processing edit page - update operation
router.post('/edit/:id', requireAuth, surveyController.processingEditPage);

router.get('/onoff/:id', requireAuth, surveyController.displayOnOffPage);
router.post('/onoff/:id', requireAuth, surveyController.processingOnOffPage);



// get to perform deletion - delete operation
router.get('/delete/:id', requireAuth, surveyController.performDeletion);

// get route for displaying edit page - update operation
router.get('/setting/:id', requireAuth, surveyController.displaySettingPage);

// post route for processing edit page - update operation
router.post('/setting/:id', requireAuth, surveyController.processingSettingPage);




module.exports = router;