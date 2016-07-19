'use strict';
var Course = require('../models/course');

module.exports = function(req, res, next) {
  var courseId = req.params.id;
  Course.findOne({ _id: courseId }, function(err, item) {
    if (err) return next(err);
    item._students.push(req.user);
    item.save(function(err) {
      if (err) return next(err);
      res.redirect('/courses/' + courseId);
    });
  });
};
