'use strict';
const config = require('./config');
const connection = require("./connection");

module.exports = (req, res) => {
  console.log(req.body);
  let userName = req.cookies.userName;
  let acc = req.query.acc;
  if(req.headers["origin"] == "http://localhost:8000"){
    acc = 'nanfangxinwujin';
  }else{
    if(acc && !userName){
      acc = acc;
    }else if(userName && !acc){
      acc = userName;
    }else if(acc && userName){
      acc = acc;
    }else if(!acc && !userName){
      // res.status(400).send("Bad Request");
      // acc = "nanfangxinwujin";
    }
  }
  let sol = "";
  let arr = [ acc ];
  console.log("acc", acc);
  connection.query(
    "select * from customer_contact where user_id = (select id from user where acc = '" + acc + "')", 
    arr,
    function(err, rows, fields) { 
      if (err) 
        throw err;  
      sol = rows;
      let result = "" + sol;
      let data = JSON.stringify(sol);
      console.log(sol);
      res.send(data);
  });
};