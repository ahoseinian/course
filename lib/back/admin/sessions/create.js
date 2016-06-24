'use strict';
var Session = require('../../models/session');
module.exports = function(req, res, next){
  var session = new Session(req.body);
  session.save(function(err){
    if(err) return next(err);
    res.redirect('/admin/sessions');
  });

};