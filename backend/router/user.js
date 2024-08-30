const express = require('express');
const router = express.Router();
const routerHandler = require('../router_handler/user.js');

//router.post('/register',routerHandler.regUser);

router.post('/login',routerHandler.login);


module.exports = router;