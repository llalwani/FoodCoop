#!/usr/bin/env node

var util = require('util'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    events = require('events'),
	express = require('express'),
	mongoose = require('mongoose'),
	models = require('./models.js'),
	API = require('./API.js'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

var forgot = require('password-reset')({
    uri : 'http://localhost:8080/password_reset',
    from : 'password-robot@localhost',
    host : 'localhost', port : 25,
});

mongoose.connect('mongodb://localhost/mydb');
var db = mongoose.connection;

var app = API.configAPI(express());

app.use(express.static(path.normalize(path.join(__dirname, '../app'))));



//Passport Setup
app.use(forgot.middleware); //forgotten password middleware
passport.use(models.User.createStrategy());
passport.serializeUser(models.User.serializeUser());
passport.deserializeUser(models.User.deserializeUser());
function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
}


app.listen(8081);
