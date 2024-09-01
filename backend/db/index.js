const mysql = require('mysql');

const db=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'1628772501',
    database:'financial'
});

module.exports = db;