

let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');
const titles = require('../models/result');

function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


//j
function boardDisable(req, res, next)
{
    if(click.disable())
    {
        return res.redirect('/home');
    }
}



/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Me page. */
router.get('/about', indexController.displayAboutPage);
/* GET Projects page. */

/* GET Contact Me page. */
router.get('/contact', indexController.displayContactMePage);

// get route for displaying Login page 
router.get('/login', indexController.displayLoginPage);

// post route for processing Login page 
router.post('/login', indexController.processLoginPage);

// get route for displaying register page 
router.get('/register', indexController.displayRegisterPage);

// post route for processing register page 
router.post('/register', indexController.processRegisterPage);

// Perform logout 
router.get('/logout', indexController.performLogout);

// get route for displaying participate survey list
router.get('/participate/:id', requireAuth, indexController.displayParticipatePage);

// get route for processing participate survey list
router.post('/participate/:id', requireAuth, indexController.postParticipatePage);

// get route for displaying result of survey
router.get('/result/:id', indexController.displayResultPage);


module.exports = router;

