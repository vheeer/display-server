const mysql = require("mysql");
const { template, custom, project, host } = require("./config");
let connection = mysql.createConnection({
  host   : '172.17.0.12', 
  port   : '3306',
  user   : 'session_user', 
  password : 'Classmate1133', 
  database : project
}); 
connection.connect();
module.exports = connection;