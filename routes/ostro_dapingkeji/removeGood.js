'use strict';
const config = require('./config');
const connection = require("./connection");
const fs = require("fs");//操作文件
const multer = require('multer');//接收图片

const { host, img_dir, upload_image_dir, upload_image_dir_child } = config;

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
  // let str = body.split('\'')[1].split('\'')[0];
  let obj = JSON.parse(str);
  console.log(obj);
  // res.send(req.body);
  let id = obj.id;

  let query = "update good set able = 0 where id = ?";
  let arr = [ id ];
  connection.query(query, arr, function(err, rows, fields){
    if(err)
      throw err;
    console.log('The solution is: ', rows);
    console.log('The fields is: ', fields);
    if(rows.affectedRows == 1){
      res.send({ mes: "success", data: obj }); 
      console.log('删除成功!');
    }else{
      res.status(200).send({ mes: "fail" });
      console.log('删除失败!');
    }
  });
  
  // res.writeHead(200, {
  //     "Access-Control-Allow-Origin": "*"
  // });
  // res.end(JSON.stringify(file)+JSON.stringify(req.body));
};