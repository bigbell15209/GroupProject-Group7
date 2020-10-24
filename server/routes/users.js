/*
File Name: Assignment2
Student's Name: Eunbee Lee
Student ID: 301083645
Date: 2020 Oct 24th
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
