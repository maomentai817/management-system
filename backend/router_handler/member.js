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