const express = require('express')
const router = express.Router()
const routerHandler = require('../router_handler/picture.js');

router.get('/pictures',routerHandler.getPicture);

module.exports = router;