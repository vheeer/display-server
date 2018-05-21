'use strict';
const config = require('../config');
const connection = require("../ostroTool/connection");

module.exports = (req, res) => {
  console.log(req.body);
  let sol = "";
  connection.query(
    "select * from customer_contact", 
    function(err, rows, fields) { 
      if (err) 
        throw err;  
      sol = rows;
      let result = "" + sol;
      let data = JSON.stringify(sol);
      console.log(sol);
      res.set(
        "Access-Control-Allow-Origin", "*"
      );
      res.send(data);
  });
};