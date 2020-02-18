var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
const mongoose = require('mongoose').set('debug', true);

try {
  mongoose.connect(process.env.mongodb)
} catch(e) {
  console.error('was not possible to connect to', process.env.mongodb);
}

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('./api/routes')(app);

module.exports = app;
