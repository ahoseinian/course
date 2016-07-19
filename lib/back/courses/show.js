'use strict';
var Course = require('../models/course');
var async = require('async');

module.exports = function(req, res, next) {
  async.parallel({
    item: function(cb) {
      return Course.findOne({ _id: req.params.id }, cb);
    }
  }, function(err, data) {
    if (err) return next(err);
    res.render('courses/show', {
      data: data
    });
  });

};
