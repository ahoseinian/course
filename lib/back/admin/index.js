var router = require('express').Router();

router.use('/courses', require('./courses'));
router.use('/courses/:courseId/sessions', require('./sessions'));

module.exports = router;
