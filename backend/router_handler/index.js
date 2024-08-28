const db=require('../db/index.js');

exports.testsql = (req,res) => {
    const sqlStr = 'select * from Member';
    db.query(sqlStr, (error, results) => {
        if(error)
            return res.send(error);
        return res.send(results);
    })
}