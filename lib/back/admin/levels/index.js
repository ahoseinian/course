'use strict';
var router = require('express').Router();
var Course = require('../../models/course');
var Level = require('../../models/level');
var async = require('async');

router.get('/:courseId/levels', require('../../auth/authorize').isCourseOwner, function(req, res, next) {
  async.parallel({
    course: function(cb) {
      Course.findOne({ _id: req.params.courseId }).exec(cb);
    },
    levels: function(cb) {
      Level.find({ _course: req.params.courseId }).exec(cb);
    }
  }, function(err, data) {
    if (err) return next(err);
    res.render('admin/levels/index', {
      data: data
    });
  });
});

router.post('/:courseId/levels', require('../../auth/authorize').isCourseOwner, require('./create'));
module.exports = router;
