/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

// let createError = require('http-errors');
let express = require('express');
// let path = require('path');
// let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

//modules for authentication
// let session = require('express-session');
let passport = require('passport');
// let passportJWT = require('passport-jwt');
// let JWTStrategy = passportJWT.Strategy;
// let ExtractJWT = passportJWT.ExtractJwt;
// let passportLocal = require('passport-local');
// let localStrategy = passportLocal.Strategy;
// let flash = require('connect-flash');
let errorHandler = require("./error-handler");


//Database 
let mongoose = require('mongoose');
let dbURI = require('./db');

// Connect to the Database
mongoose.connect(dbURI.AtlasDB,{ useNewUrlParser: true });

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

// require('./auth');
let app = express();

// Enables cors.
app.use(cors());
app.options('*', cors());

let indexRouter = require('../routes/index');
let incidentRouter = require('../routes/incident');

// view engine setup
// app.set('views', path.join(__dirname, '../views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../../public')));
// app.use(express.static(path.join(__dirname, '../../node_modules')));

// setup express session
// app.use(session({
//   secret:"SomeSecret",
//   saveUninitialized: false,
//   resave: false
// }));

// initialize flash
// app.use(flash());

//initialize passport
app.use(passport.initialize());
// app.use(passport.session());

// passport user configuration

// // create a User Model instance
// let userModel = require('../models/user');
// let User = userModel.User;

// //implement a User Authentication Strategy
// passport.use(User.createStrategy());

// //serialize and deserialize the user Info
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());;

// let jwtOptions = {};
// jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
// jwtOptions.secretOrKey = dbURI.Secret;

// let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
//   User.findById(jwt_payload.id)
//     .then(user => {
//       return done(null, user);
//     })
//     .catch(err => {
//       return done(err, false);
//     });
// });

// passport.use(strategy);

//routing
app.use('/', indexRouter);
app.use('/incident', incidentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ statusCode: 404, message: "The endpoint does not exist."});
});

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
