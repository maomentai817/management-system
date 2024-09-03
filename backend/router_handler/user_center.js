const db = require('../db/index.js')

exports.getUserInfo = (req,res) => {
  const sqlStr = 'select id,username,avatar FROM users WHERE username=?';

  //console.log('enter the function')
  db.query(sqlStr, [req.query.username], (err,results) => {
    if(err || results.length ===0){
      return res.send({
        statsu:404,
        msg:"用户未找到"
      })
    }

    if(results[0].avatar) {
      const buffer = results[0].avatar
      const base64Image = `data:image/jpg;base64,${buffer.toString('base64')}`
      results[0].avatar = base64Image
    }
    return res.send({
      status:200,
      msg:'获取用户信息成功',
      data:results
    })
  })
}

exports.updateUserName = (req,res) => {
  const sqlStr = 'update users set username=? where username = ?'
  // console.log(req)
  const userInfoData = {
    username: req.body.username,
  }
  db.query(sqlStr, [req.body.username, req.query.username], (err, results)=> {
    if(err)
      return res.cc(err,500)
    return res.send({
      status:200,
      msg: '修改用户名成功',
    })
  })
}


exports.updateAvatar = (req,res) => {
  const {avatar} = req.body
  // console.log(avatar)
  const base64Data = avatar.replace(/^data:image\/\w+;base64,/,'');
  const buffer = Buffer.from(base64Data,'base64')

  // console.log(buffer)

  const sqlStr = 'UPDATE users set avatar=? WHERE username=?'
  db.query(sqlStr, [buffer,req.query.username], (err,results) => {
    // console.log(err)
    if(err){
      return res.send({
        status:500,
        msg:'存储失败'
      })
    }
    return res.send({
      status:200,
      msg:'存储成功'
    })
  })
}