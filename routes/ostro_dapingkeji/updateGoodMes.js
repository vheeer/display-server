'use strict';
const config = require('./config');
const connection = require("./connection");
const fs = require("fs");

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
  let arr = [ obj.data.values.title, obj.data.values.desc, obj.data.goodItem.id ];
  connection.query(
    "update good set title = ?, description = ? where id = ?;",
    arr, 
    function(err, rows, fields) { 
      if (err) 
        throw err;  
      const { message } = rows;
      console.log('The solution is: ', rows);
      console.log('The fields is: ', fields);
      console.log('The message is: ', message);
      if(rows.affectedRows == 1 && rows.changedRows == 1)
        res.send({ mes: "success", data: arr });
      else
        res.send({ mes: "fail" });
  });
};