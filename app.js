var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var create_btc_w_Router = require('./routes/create_btc_w');
var hash_result_Router = require('./routes/result');
var consulta_Router = require('./routes/consulta');
var create_transaction_Router = require('./routes/create_transaction');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/create_btc_w', create_btc_w_Router);
app.use('/result', hash_result_Router);
app.use('/consulta', consulta_Router);
app.use('/create_transaction', create_transaction_Router);

app.get("/", function (req,res) {

  res.render("index.ejs");

})

app.get("/create_btc_w", function (req,res) {

  res.render("create_btc_w.ejs");

})
app.get("/result", function (req,res) {

  res.render("result.ejs");

})
app.get("/consulta", function (req,res) {

  res.render("consulta.ejs");

})
app.get("/create_transaction", function (req,res) {

  res.render("create_transaction.ejs");

})
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
