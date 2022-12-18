const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);



// error handler
app.use(function(err, res, next) {
  let errorNum = 404;
  if (err.statusCode != null)  errorNum = err.statusCode;

  res.status(errorNum).render('error',{
    Error : errorNum
  });
});

module.exports = app;
