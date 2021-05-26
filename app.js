const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const roleRouter = require('./routes/Roles');
const sizeRouter = require('./routes/Sizes');
const brandRouter = require('./routes/Brands');
const modelRouter = require('./routes/Models');
const testRouter = require('./routes/test');
const collectionRouter = require('./routes/Collections');
const productRouter = require('./routes/Products');
const productDetailRouter = require('./routes/ProductDetails');

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

app.use('/Roles',roleRouter);
app.use('/Sizes',sizeRouter);
app.use('/Brands',brandRouter);
app.use('/Models',modelRouter);
app.use('/test',testRouter);
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
