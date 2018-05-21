'use strict';
const config = require('./config');
const connection = require("./connection");
const fs = require("fs");
var cookieParser = require('cookie-parser');

setInterval(() => {
    connection.query("select * from user limit 1;");
},300);

module.exports = (req, res) => {
  console.log(req.body);
  const body = req.body;
  let str = "";
  for(var key in body)
  {
    console.log("result__")
    console.log(key);
    console.log(body[key]);
    str = key;
  }
  // let str = body.split('\'')[1].split('\'')[0];
  let obj = JSON.parse(str);
  let { userName, password } = obj;
  let sql = "select count(*) as result, id from user where acc=? and psd=?";
  let arr = [ userName, password ];
  connection.query(sql, arr, (err, rows, fields) => {
    if (err) 
        throw err;  
    const { id, result } = rows[0];
    console.log('The solution is: ', rows);
    console.log('The fields is: ', fields);
    // res.header('Access-Control-Allow-Origin', "http://localhost:8000"); 
    // res.header('Access-Control-Allow-Origin', req.headers["origin"]); 
    // console.log("Origin is: ", req.headers["origin"]);
    if(rows[0]["result"] == 1){
        res.cookie('login', '1', { maxAge: 3600*24*1*1000 });
        res.cookie('userName', userName, { maxAge: 3600*24*1*1000 });
        res.cookie('id', id, { maxAge: 3600*24*1*1000 });
        res.send({ mes: "success", data: { userName, id } });
    }else if(rows[0]["result"] == 0){
        res.cookie('login', '0', { maxAge: 3600*24*1*1000 });
        res.cookie('userName', "userName", { maxAge: -3600*24*1*1000  });
        res.cookie('id', "id", { maxAge: -3600*24*1*1000 });
        res.send({ mes: "fail" });
    }
  });
};