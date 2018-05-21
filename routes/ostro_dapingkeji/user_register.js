'use strict';
const config = require('./config');
const connection = require("./connection");
const fs = require("fs");
var cookieParser = require('cookie-parser');

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
  let obj = JSON.parse(str);
  let { email, password } = obj;
  let sql = "insert into user ( acc, psd )values( ?, ? );";
  let arr = [ email, password ];
  connection.query(sql, arr, (err, rows, fields) => {
    if(err) {
      res.send({ mes: "fail" });
      throw err;
    }
    const { affectedRows, insertId } = rows;
    console.log('The solution is: ', rows);
    console.log('The fields is: ', fields);
    if(affectedRows == 1){
      connection.query("insert into mess (user_id)values(?);", [ insertId ], (err, rows, fields) => {
        if(err) {
          res.send({ mes: "fail" });
          throw err;
        }
        res.cookie('login', '1', { maxAge: 3600*24*1*1000 });
        res.cookie('userName', email, { maxAge: 3600*24*1*1000 });
        res.cookie('id', insertId, { maxAge: 3600*24*1*1000 });
        res.send({ mes: "success", data: { id: insertId, userName: email, password } });
      });
      
    }else{
      res.send({ mes: "fail" });
    }
  });
};