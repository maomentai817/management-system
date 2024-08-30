const mysql = require('mysql');

const db=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'qw123456',
    database:'financial'
});

module.exports = db;