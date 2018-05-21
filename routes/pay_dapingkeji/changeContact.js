'use strict';
const config = require('./config');
const connection = require("./connection");
const fs = require("fs");

module.exports = (req, res) => {
  console.log(req.body);
  const body = req.body;
  
  let { user_id } = require("./tools/getID")( req );

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
  console.log(obj);
  // res.send(req.body);
  let arr = [ obj.title, obj.phone_1, obj.phone_2, obj.website, user_id ];
  connection.query(
    "update mess set contact_title = ?,contact_1 = ?,contact_2 = ?,contact_website = ? where user_id = ?",
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