const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const email_router = require('./routes/email_router');
const cors = require('cors');

let app = express();
let corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'application/json']
}

// view engine setup
app.use(express.static(__dirname + '/dist/'));
app.get('/*',(req, res) =>{
	res.sendFile(path.join(__dirname,'/dist/index.html'));
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Middlewares
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Rutas
app.use('/api/sendEmail', email_router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;