'use strict';
const config = require('./config');
const connection = require("./connection");
const fs = require("fs");

module.exports = (req, res) => {
  console.log(req.body);
  const body = req.body;
  let user_id = req.cookies.id;
  if(req.headers["origin"] == "http://localhost:8000"){
    user_id = 1;
  }else{
    user_id = user_id;
  }
  let str = "";
  for(var key in body)
  {
    console.log("result__")
    console.log(key);
    console.log(body[key]);
    str = key;
  }
  let obj = JSON.parse(str);
  console.log(obj);
  let arr = [ obj.serviceDesc, user_id ];
  connection.query(
    "update mess set service_desc = ? where user_id = ?;",
    arr, 
    function(err, rows, fields) { 
      if (err) 
        throw err;  
      const { message } = rows;
      console.log('The solution is: ', rows);
      console.log('The fields is: ', fields);
      console.log('The message is: ', message);
      
      if(rows.affectedRows == 1 && rows.changedRows == 1)
        res.send({ mes: "success" });
      else
        res.send({ mes: "fail" });
  });
};