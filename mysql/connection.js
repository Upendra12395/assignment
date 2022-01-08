const mysql = require('mysql')
const config = require('../config.json')


var mysqlConn = mysql.createConnection({
    host : config.host,
    user : config.user,
    password : config.password1,
    database : config.database,
    multipleStatements : true
})

module.exports = mysqlConn