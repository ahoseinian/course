'use strict';
var Level = require('../../models/level');
module.exports = function(req, res, next){
  var level = new Level(req.body);
  level.save(function(err){
    if(err) return next(err);
    res.redirect('/admin/levels');
  });

};