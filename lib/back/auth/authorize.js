'use strict';
var Course = require('../models/course');
module.exports = {
  isLoggedIn: function(req, res, next) {
    if (req.user) return next();
    res.redirect('/auth/login');
  },
  isAdmin: function(req, res, next) {
    if (req.user && req.user.admin) return next();
    // req.flash('error', 'u r not authorized');
    res.redirect(401, '/');
  },
  isCourseOwner: function(req, res, next) {
    Course.count({ _id: req.params.courseId, _owner: req.user._id }).exec(function(err, count) {
      if (err) return next(err);
      if (count) return next();
      res.redirect(401, '/');
    });
  }
};
