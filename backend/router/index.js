var express = require('express');
var router = express.Router();
const routerHandler = require('../router_handler/index.js');

router.get('/getMessage',routerHandler.testsql);


module.exports = router;