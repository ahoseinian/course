'use strict';
var Course = require('../models/course');
var async = require('async');

var controller = function(req, res, next) {

  async.parallel({
    items: function(cb) {
      return Course.find(cb);
    }
  }, function(err, data) {
    if (err) return next(err);
    res.render('courses/index', {
      data: data
    });
  });
};

module.exports = controller;
