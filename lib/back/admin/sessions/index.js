'use strict';
var router = require('express').Router();

router.get('/', function(req, res, next){
  res.render('admin/sessions/index');
});

router.post('/', require('./create'));
module.exports = router;
