'use strict';
var auth = require('../auth/authorize');
var router = require('express').Router();


router.get('/', require('./home'));
router.get('/:id', require('./show'));
router.get('/:id/enroll', auth.isLoggedIn, require('./enroll'));

module.exports = router;
