
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');

let localStrategy = passportLocal.Strategy;
let userModel = require('../models/user');
let User = userModel.User; 

let flash = require('connect-flash');

let indexRouter = require('../routes/index');
let businessRouter = require('../routes/business');
let usersRouter = require('../routes/users');

let app = express();

let mongoose = require('mongoose');
let DB = require('./DB');

mongoose.connect(DB.URL, {useNewUrlParser: true, useUnifiedTopology: true});
let dbConnection = mongoose.connection; 

dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', ()=>{
  console.log('MongoDB Connection OPEN');
});

dbConnection.once('connected', ()=>{
  console.log('MongoDB Connected');
});

dbConnection.on('disconnected', ()=>{
  console.log('MongoDB Disconnected');
});

dbConnection.on('reconnected', ()=>{
  console.log('MongoDB Reconnected');
});

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

let Auth = require('./auth');
app.use(session({
  secret: Auth.Secret,
  saveUninitialized: false,
  resave: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/business-list', businessRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
