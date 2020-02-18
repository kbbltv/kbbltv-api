const express = require('express'),
    router = express.Router(),
    controller = require('./authentication.controller');

router.post('', controller.login);

module.exports = router;