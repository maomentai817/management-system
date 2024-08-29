const express = require('express');
const router = express.Router();
const routerHandler = require('../router_handler/member.js');



router.get('/members',routerHandler.getMembers);


module.exports = router;