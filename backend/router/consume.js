const express = require('express');
const router = express.Router();
const routerHandler = require('../router_handler/consume.js');

//新增收入支出
router.post('/consumes',routerHandler.addConsume);

//更改收入支出
router.put('/consumes/:id', routerHandler.alterConsumeById);

//删除收入支出
router.delete('/consumes/:id',routerHandler.deleteConsumeById);

//查询所有的收入支出

router.get('/consumes',routerHandler.getAllConsumes);

router.get('/consumes/member/:id',routerHandler.getConsumeByMemId);

router.get('/consumes/outcome', routerHandler.getOutcome);

router.get('/consumes/income', routerHandler.getIncome);

router.get('/consumes/category', routerHandler.getCategory);

router.get('/outcome/conditions',routerHandler.getOutcomeByConditions);

router.get('/income/conditions',routerHandler.getIncomeByConditions);

module.exports = router;