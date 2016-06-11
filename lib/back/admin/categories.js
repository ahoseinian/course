var router = require('express').Router();
var Category = require('../models/category');

router.get('/', function(req, res, next) {
  Category.find({}, function(err, categories) {
    if (err) return next(err);
    res.render('admin/categories', {
      categories: categories
    });
  });
});


router.post('/', function(req, res, next) {
  var cat = new Category(req.body);
  cat.save(function(err) {
    if (err) return next(err);
    res.redirect('/admin/categories');
  });
});

module.exports = router;
