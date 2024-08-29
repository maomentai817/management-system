const express = require('express');
const router = express.Router();
const routerHandler = require('../router_handler/member.js');


//查询所有成员
router.get('/members',routerHandler.getMembers);

//增加成员
router.post('/members',routerHandler.addMember);


module.exports = router;