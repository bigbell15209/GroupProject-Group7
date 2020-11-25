

let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');
const titles = require('../models/titles');

function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
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

// Delete survey title in list
router.get('/delete/:id', indexController.performDeletion);

// get route for displaying participate survey list
router.get('/participate/:id', requireAuth, indexController.displayParticipatePage);


module.exports = router;

