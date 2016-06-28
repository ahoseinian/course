'use strict';
var router = require('express').Router();
var Course = require('../../models/course');

router.get('/:courseId/levels', function(req, res, next) {
  Course.findOne({ _id: req.params.courseId }).exec(function(err, course) {
    if (err) return next(err);
    res.render('admin/levels/index', {
      course: course
    });
  });
});

router.post('/', require('./create'));
module.exports = router;
