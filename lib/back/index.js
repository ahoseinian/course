var router = require('express').Router();

router.use('/admin', require('./auth/authorize').isAdmin, require('./admin'));
router.use('/auth', require('./auth'));
router.use('/courses', require('./courses'));

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
