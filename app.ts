require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const connectDB = require("./database/database");
const session = require('express-session');
const passport = require('passport');
const discordStrategy = require('./strategies/discordstrategy');

// Routes
const loginRoute = require('./routes/login')
const authRoute = require('./routes/auth')
const dashboardRoute = require('./routes/dashboard')

const app = express();
connectDB.default();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(session({
  secret: "some random secret",
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  saveUninitialized: false,
  name: 'discord.oauth2'
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', loginRoute);
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);

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
