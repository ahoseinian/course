'use strict';
var Course = require('../../models/course');
module.exports = function(req, res, next){
  var course = new Course(req.body);
  course.save(function(err){
    if(err) return next(err);
    res.redirect('/admin/courses');
  });

};