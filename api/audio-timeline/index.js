const express = require('express'),
    router = express.Router(),
    controller = require('./audio-timeline.controller'),
    authenticationHandler = require('../handlers/authentication.handler');

router.get('/now', controller.now);

module.exports = router;