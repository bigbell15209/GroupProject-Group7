var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{ title: 'Eunbee Lee',});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index',{ title: 'Eunbee Lee',});
});

/* GET About Me page. */
router.get('/about', function(req, res, next) {
  res.render('about',{ title: 'About Me',});
});
/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects',{ title: 'Projects',});
});
/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('services',{ title: 'Services',});
});
/* GET Contact Me page. */
router.get('/contact', function(req, res, next) {
  res.render('index',{ title: 'Contact Me',});
});


module.exports = router;

