const express = require('express')
const router = express.Router()
const routerHandler = require('../router_handler/ai.js')
const routerStream = require('../router_handler/ai_stream.js')

router.post('/ai',routerHandler.financialHelper)
router.get('/ai/clear',routerHandler.clearMsgList)
router.post('/aistream',routerStream.financialHelper)
router.get('/aistream/clear',routerStream.clearMsgList)

module.exports = router