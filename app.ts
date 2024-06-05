import createError = require('http-errors');
import express = require('express');
import path = require('path');
import cookieParser = require('cookie-parser');
import logger = require('morgan');

import cors = require('cors');
import connectDB = require("./database/database");

const userRouter = require('./routes/user');
const circuitRouter = require('./routes/circuit');
const vehicleRouter = require('./routes/vehicle');
const gameRouter = require('./routes/game');
const eventRouter = require('./routes/event');
const raceRouter = require('./routes/race');

connectDB.default();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/user', userRouter);
app.use('/circuit', circuitRouter);
app.use('/vehicle', vehicleRouter);
app.use('/game', gameRouter);
app.use('/event', eventRouter);
app.use('/race', raceRouter);

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
