const express = require('express')
const router = express.Router()
const routerHandler = require('../router_handler/user_center.js')

router.get('/userinfo/',routerHandler.getUserInfo)

router.post('/userinfo/name',routerHandler.updateUserName)

router.post('/userinfo/avatar',routerHandler.updateAvatar)

module.exports = router;