const express = require('express')
const router = express.Router()
const routerHandler = require('../router_handler/ai.js')

router.post('/ai',routerHandler.financialHelper)
router.get('/ai/clear',routerHandler.clearMsgList)

module.exports = router