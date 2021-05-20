const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('mySever/routes/index');
const usersRouter = require('mySever/routes/Users');
const roleRouter = require('mySever/routes/Roles');
const sizeRouter = require('mySever/routes/Sizes');
const brandRouter = require('mySever/routes/Brands');
const modelRouter = require('mySever/routes/Models');
const collectionRouter = require('mySever/routes/Collections');
const productRouter = require('mySever/routes/Products');
const productDetailRouter = require('mySever/routes/ProductDetails');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/Users', usersRouter);
app.use('/Roles',roleRouter);
app.use('/Sizes',sizeRouter);
app.use('/Brands',brandRouter);
app.use('/Models',modelRouter);
app.use('/Collections',collectionRouter);
app.use('/Products',productRouter);
app.use('/ProductDetails',productDetailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
