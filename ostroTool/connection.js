const mysql = require("mysql");
// var connection = mysql.createConnection({ 
//   host   : '123.56.240.163', 
//   port   : '3306',
//   user   : 'pc', 
//   password : 'ostrovsky_y', 
//   database : 'vh'
// }); 
let connection = mysql.createConnection({
  host   : '172.17.0.12', 
  port   : '3306',
  user   : 'session_user', 
  password : 'Classmate1133', 
  database : 'cAuth'
}); 
connection.connect();
module.exports = connection;