const axios = require('axios')
const path = require('path')
const fs = require('fs')
const {url} = require('../uploads/picurl.js')

exports.getPicture =(req,res) => {

    const getRandomImages = (count) => {
        console.log("running the funciton")
        console.log(url)
        const shuffled = url.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    // 调用函数获取指定数量的随机图片
    return res.send({
        status:200,
        msg:"返回图片成功",
        data:getRandomImages(10)
    })
}