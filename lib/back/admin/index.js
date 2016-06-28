var router = require('express').Router();

router.use('/courses', require('./courses'));
router.use('/courses', require('./levels'));

module.exports = router;
