const mysql = require('mysql');

const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'1628772501',
    database:'financial'
});

module.exports = db;