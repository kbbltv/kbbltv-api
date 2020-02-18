const express = require('express'),
    router = express.Router(),
    controller = require('./video-timeline.controller'),
    authenticationHandler = require('../handlers/authentication.handler');

router.get('', authenticationHandler.isLoggedin, authenticationHandler.isAdmin, controller.list);
router.post('', authenticationHandler.isLoggedin, authenticationHandler.isAdmin, controller.create);

module.exports = router;