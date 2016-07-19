var router = require('express').Router();

router.get('/', require('./home'));
router.get('/:id', require('./show'));

module.exports = router;
