var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var messages = require('./lib/messages');
var user = require('./lib/middleware/user');
var notFound = require('./lib/middleware/notFound');
var error = require('./lib/middleware/error');

var registerRoute = require('./routes/register')
var loginRoute = require('./routes/login')
var entriesRoute = require('./routes/entries')
var apiRoute = require('./routes/api')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'keyboard cat',cookie: {}}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(messages)

if (process.env.ERROR_ROUTE) {
  // $ ERROR_ROUTE=1 npm start，用来测试error middleware
  app.get('/dev/error', function (req, res, next) {
    var err = new Error('database connection failed')
    err.type = 'database'
    next(err)
  })
}

app.use('/api', apiRoute)
app.use(loginRoute)
app.use(registerRoute)
app.use(user)
app.use(entriesRoute)
app.use(notFound)

// error handler
app.use(error)
/* app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */

module.exports = app;
