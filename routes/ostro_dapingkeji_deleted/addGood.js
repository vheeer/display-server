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
  console.log(obj);
  let arr = [ 
    obj.title?obj.title:"", 
    obj.description?obj.description:"", 
    obj.visit?obj.visit:1, 
    obj.tel?obj.tel:"", 
    obj.img?obj.img:"", 
  ];
  connection.query(
    "insert into good (title,description,visit,tel,img,date)values(?,?,?,?,?,now());",
    arr, 
    function(err, rows, fields) { 
      if (err) 
        throw err;  
      const { message } = rows;
      console.log('The solution is: ', rows);
      console.log('The fields is: ', fields);
      console.log('The message is: ', message);
      const { insertId } = rows;
      if(rows.affectedRows == 1){
        connection.query(
          "select * from good where id=?",
          [insertId], 
          function(err, rows, fields) {
            if(err)
              throw err;
            const { message } = rows;
            console.log('The solution_2 is: ', rows);
            console.log('The fields_2 is: ', fields);
            console.log('The message_2 is: ', message);
            res.header("Access-Control-Allow-Origin", "*");
            res.send({ mes: "success", data: rows });
          }
        )
      }
      else
        res.send({ mes: "fail" });
  });
};