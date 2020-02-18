const express = require('express'),
    router = express.Router(),
    controller = require('./youtube-data.controller'),
    authenticationHandler = require('../handlers/authentication.handler');

router.get('', authenticationHandler.isLoggedin, authenticationHandler.isAdmin, controller.get);

module.exports = router;