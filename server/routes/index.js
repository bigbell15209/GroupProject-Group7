

let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');




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


module.exports = router;

