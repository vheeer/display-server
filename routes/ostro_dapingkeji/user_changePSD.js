'use strict';
const config = require('./config');
const connection = require("./connection");
const fs = require("fs");
var cookieParser = require('cookie-parser');

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
  let { password, password_new } = obj;

  let makePromise = ( sql, arr ) => {
    return new Promise(( resolve, reject ) => {
      // let sql = "update user set psd = ? where id = ?";
      // let arr = [ password_new, user_id ];
      connection.query(sql, arr, ( err, rows, fields ) => {
        resolve({ err, rows, fields });
      });
    })
  }

  makePromise("select count(*) as result, id from user where id=? and psd=?", [ user_id, password ])
  .then(({ err, rows, fields }) => {
    if(err) {
      res.status(500).send({ mes: "fail" });
      throw err;
    }
    console.log('The solution is: ', rows);
    console.log('The fields is: ', fields);
    if(rows[0]["result"] == 1){
      return makePromise("update user set psd = ? where id = ?", [ password_new, user_id ]);
    }else{
      res.status(200).send({ mes: "fail", reason: "用户名或密码不正确" });
      throw "user or password is not currect";
    }
  })
  .then(({ err, rows, fields }) => {
    if(err) {
      res.status(500).send({ mes: "fail" });
      throw err;
    }
    console.log('The solution is: ', rows);
    console.log('The fields is: ', fields);
    res.send({ mes: "success" });
  })
  .catch(( reason ) => {
    res.status(500).send(reason);
  });
};