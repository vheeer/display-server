'use strict';
const config = require('./config');
const connection = require("./connection");
function toKeyString(obj) {
    let str = "";
    let holders = "";
    let arr = [];
    for(let key in obj)
    {
      str += key + ",";
      holders += "?,";
      arr.push(obj[key]);
    }
    str = str.substr(0, str.length - 1);
    holders = holders.substr(0, holders.length - 1);
    console.log({ str, holders });
    return { str, holders, arr };
}
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
      res.status(400).send("Bad Request");
      // acc = "nanfangxinwujin";
    }
  }
  let { str, holders, arr } = toKeyString(req.body);
  let sol = "";
  // arr.push(acc);
  connection.query( 
    "insert into customer_contact (" + str +  
    ",user_id" //add more column here 
    + ")values(" + holders +  
    ",(select id from user where acc = '" + acc + "')" //add more holders here 
    + ");", 
    arr,  
    function(err, rows, fields) { 
      if (err)
        throw err;
      console.log('The solution is: ', rows[0]);
      sol = rows[0];
      let result = "" + sol;
      let data = JSON.stringify(sol);
      console.log(sol);
      res.send({ mes: "success to add contact" });
  });
};