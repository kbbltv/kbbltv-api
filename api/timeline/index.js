const express = require('express'),
    router = express.Router(),
    controller = require('./timeline.controller');

router.get('', controller.now);

module.exports = router;