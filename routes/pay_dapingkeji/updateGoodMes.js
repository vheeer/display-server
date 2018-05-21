'use strict';
const config = require('./config');
const connection = require("./connection");
const fs = require("fs");

module.exports = (req, res) => {
  console.log(req.body);
  const body = req.body;

  console.log(req.body);
  let { id, price, richtext, title, desc } = req.body;
  // for(var key in body)
  // {
  //   console.log("result__")
  //   console.log(key);
  //   console.log(body[key]);
  //   str = key;
  // }
  // str = str.replace("0CC175B9C0F1B6A831C399E269772661", "&");
  // str = str.replace("92EB5FFEE6AE2FEC3AD71C777531578F", "\"");
  // let obj = JSON.parse(str);
  // let price = obj.data.values.price?obj.data.values.price:null;
  // let richtext = obj.data.values.richText?obj.data.values.richText:null;
  let arr = [ title, desc, price, richtext, id ];
  connection.query(
    "update good set title = ?, description = ?, price = ?, richtext = ? where id = ?;",
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