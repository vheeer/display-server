const mysql = require("mysql");
const { template, custom, project, host } = require("./config");
let connection = mysql.createConnection({
  host   : '172.21.0.13', 
  port   : '3306',
  user   : 'root', 
  password : 'Classmate1133', 
  database : project
}); 
connection.connect();
module.exports = connection;