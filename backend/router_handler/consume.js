const db = require('../db/index.js');

exports.getAllConsumes = (req,res) => {
    const sqlStr = 'select * from consume where isDeleted = 0';
    db.query(sqlStr, (error,results) => {
        if(error) return res.cc(error, 500);
        return res.send({
            status: 200,
            msg: '获取所有消费记录成功',
            data: results
        });
    });
};

exports.getOutcome = (req,res) => {
    const sqlStr = 'select * from consume where (transactionType = 0 and isDeleted = 0)';
    db.query(sqlStr, (error, results) => {
        if(error) return res.cc(error, 500);
        return res.send({
            status: 200,
            msg: '获取所有支出记录成功',
            data: results
        });
    });
};

exports.getOutcomeByConditions = (req,res) => {
    const { name, consumeDate, category } = req.body;
    // console.log(name,consumeDate,category);
    let sqlStr = 
        "SELECT consume.memId, amount, transactionType, DATE_FORMAT(consumeDate, '%Y-%m-%d') AS consumeDate, recipient, category, isDeleted, userNote FROM consume";
    let conditions = [];
    let values = [];

    // 如果指定了name，通过name查询memId
    if (name) {
        sqlStr += ' INNER JOIN Member ON consume.memId = Member.memId';
        conditions.push('Member.name = ?');
        values.push(name);
    }

    // 如果指定了consumeDate，添加consumeDate的条件
    if (consumeDate) {
        conditions.push('DATE(consume.consumeDate) = ?');
        values.push(consumeDate);
    }

    // 如果指定了category，添加category的条件
    if (category) {
        conditions.push('consume.category = ?');
        values.push(category);
    }

    // 构建最终的查询语句
    if (conditions.length > 0) {
        sqlStr += ' WHERE ' + conditions.join(' AND ');
    }

    sqlStr += ' AND transactionType = 0';


    db.query(sqlStr, values, (error, results) => {
        if (error) 
            return res.cc(error, 500);

        return res.send({
            status: 200,
            msg: '查询成功',
            data: results
        });
    });
};

exports.getIncomeByConditions = (req,res) => {
    const { name, consumeDate, category } = req.body;
    console.log(name,consumeDate,category);
    let sqlStr = 
        "SELECT consume.memId, amount, transactionType, DATE_FORMAT(consumeDate, '%Y-%m-%d') AS consumeDate, recipient, category, isDeleted, userNote FROM consume";
    let conditions = [];
    let values = [];

    // 如果指定了name，通过name查询memId
    if (name) {
        sqlStr += ' INNER JOIN Member ON consume.memId = Member.memId';
        conditions.push('Member.name = ?');
        values.push(name);
    }

    // 如果指定了consumeDate，添加consumeDate的条件
    if (consumeDate) {
        conditions.push('DATE(consume.consumeDate) = ?');
        values.push(consumeDate);
    }

    // 如果指定了category，添加category的条件
    if (category) {
        conditions.push('consume.category = ?');
        values.push(category);
    }

    // 构建最终的查询语句
    if (conditions.length > 0) {
        sqlStr += ' WHERE ' + conditions.join(' AND ');
    }

    sqlStr += ' AND transactionType = 1';


    db.query(sqlStr, values, (error, results) => {
        if (error) 
            return res.cc(error, 500);

        return res.send({
            status: 200,
            msg: '查询成功',
            data: results
        });
    });
};

exports.getIncome = (req,res) => {
    const sqlStr = 'select * from consume where (transactionType = 1 and isDeleted = 0)';
    db.query(sqlStr, (error, results) => {
        if(error) return res.cc(error, 500);
        return res.send({
            status: 200,
            msg: '获取所有收入记录成功',
            data: results
        });
    });
};

exports.getConsumeByMemId = (req,res) => {
    const sqlStr = 'select * from consume where (memId = ? and isDeleted = 0)';
    db.query(sqlStr, [req.params.id], (error, results) => {
        if(error) return res.cc(error, 500);
        return res.send({
            status: 200,
            msg: '根据memId获取数据成功',
            data: results
        });
    });
};

exports.getCategory = (req,res) => {
    const sqlStr = 'select distinct category from consume';
    db.query(sqlStr, (error, results) => {
        if (error) 
            return res.cc(error, 500);

        const categories = results.map(row => row.category);
        return res.send({
            status:200,
            msg:'获取所有分类成功',
            data:categories
        });
    });
};

exports.addConsume = (req,res) => {
    const sqlStr = 'insert into consume set ?';
    //console.log(req.body);
    const consumeData = {
        memId: req.body.memId,
        amount: req.body.amount,
        transactionType: req.body.transactionType,
        consumeDate: req.body.consumeDate,
        recipient: req.body.recipient,
        category: req.body.category,
        userNote: req.body.userNote,
        isDeleted: req.body.isDeleted || 0
    };
    db.query(sqlStr, consumeData, (error, results) => {
        if(error) return res.send(error);
        if(results.affectedRows !== 1)
            return res.cc('新增失败', 500);
        return res.cc('新增成功');
    })
};

exports.deleteConsumeById = (req,res) => {
    const sqlStr = 'update consume set isDeleted = 1 where id = ?';
    db.query(sqlStr, [req.params.id] , (error, results) => {
        if (error) 
            return res.send(error);
        if (results.affectedRows !== 1)
            return res.cc('删除消费记录失败',500);
        res.cc('删除消费记录成功');
    })
}

exports.alterConsumeById = (req,res) => {
    const sqlStr = 'update consume set ? where id = ?';
    const consumeData = {
        memId: req.body.memId,
        amount: req.body.amount,
        transactionType: req.body.transactionType,
        consumeDate: req.body.consumeDate,
        recipient: req.body.recipient,
        category: req.body.category,
        userNote: req.body.userNote,
    };
    db.query(sqlStr, [req.body, req.params.id], (error,results) => {
        if (error) 
            return res.cc(error,500);
        return res.send({
            status:200,
            msg:'修改消费记录成功'
        })
    })
}