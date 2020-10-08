var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  
  { title: 'Eunbee Lee',
    MainHeading: 'Main Heading' });
});

module.exports = router;
