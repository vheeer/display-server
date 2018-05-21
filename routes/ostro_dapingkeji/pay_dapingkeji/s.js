const mysql = require("mysql");
const { template, custom, project, host } = require("./config");
let connection = mysql.createConnection({
  host   : 'sh-cdb-66nhcjpd.sql.tencentcdb.com', 
  port   : '63510',
  user   : 'session_user', 
  password : 'Classmate1133', 
  database : project
}); 
connection.connect();
module.exports = connection;