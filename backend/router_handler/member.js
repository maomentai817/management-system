const db = require('../db/index.js');

exports.getMembers = (req,res) => {
    const sqlStr = 'select * from Member';
    db.query(sqlStr, (error, results) => {
        if (error) 
            return res.cc(error, 500);
        return res.send({
            status:200,
            msg:'获取所有成员成功',
            data:results
        });
    });
};

exports.addMember = (req,res) => {
    const sqlStr = 'insert into Member set ?';
    const memberData = {
        name: req.body.name,
        sex: req.body.sex
    };
    db.query(sqlStr, memberData, (error, results) => {
        if (error) 
            return res.cc(error, 500);
        return res.cc('新增用户成功');
    })
}