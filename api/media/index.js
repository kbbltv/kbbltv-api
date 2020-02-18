const express = require('express'),
    router = express.Router(),
    controller = require('./media.controller'),
    authenticationHandler = require('../handlers/authentication.handler');

router.post('', authenticationHandler.isLoggedin, authenticationHandler.isAdmin, controller.create);
router.get('', authenticationHandler.isLoggedin, authenticationHandler.isAdmin, controller.search);

module.exports = router;