'use strict';
const config = require('./config');
const connection = require("./connection");
const fs = require("fs");//操作文件
const multer = require('multer');//接收图片

const { host, img_dir, upload_image_dir, upload_image_dir_child } = config;

let JSON_firstKey = (Obj) => {
  for(let key in Obj)
    return key;
};
let JSON_firstValue = (Obj) => {
  for(let key in Obj)
    return Obj[key];
};

module.exports = (req, res) => {
  console.log(req.body);
  let user_id = req.cookies.id;
  if(req.headers["origin"] == "http://localhost:8000"){
    user_id = 1;
  }else{
    user_id = user_id;
  }
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
  // let { id: uid, good_id } = obj;
  let id = obj.uid;
  let good_id = obj.good_id;
  // 如果是刚刚上传的，会有response
  if(obj.response && obj.response.data)
  {
    id = obj.response.data.insertId;
  }

  let query = "";
  let arr = [];
  switch (obj.target)
  {
    case "caseImgs":
      query = "update case_img set able = 0 where id = ?;";
      arr = [ id ];
      break;
    case "serviceImgs":
      query = "update service_img set able = 0 where id = ?;";
      arr = [ id ];
      break;
    case "bannarImgs":
      // query = "update mess set bannar_img = '' where user_id = ?;";
      query = "update bannar_img set able = 0 where id = ?;";
      arr = [ id ];
      break;
    case "showBannarImg":
      query = "update mess set show_img = null where user_id = ?;";
      arr = [ user_id ];
      break;
    case "serviceBannarImg":
      query = "update mess set service_img = null where user_id = ?;";
      arr = [ user_id ];
      break;
    case "companyBannarImg":
      query = "update mess set company_img = null where user_id = ?;";
      arr = [ user_id ];
      break;
    case "cultureBannarImg":
      query = "update mess set culture_img = null where user_id = ?;";
      arr = [ user_id ];
      break;
    case "contactBannarImg":
      query = "update mess set contact_us_img = null where user_id = ?;";
      arr = [ user_id ];
      break;
    case "goodImg":
      query = "update good_img set able = 0 where id = ?;";
      arr = [ id ];
      break;
    case "goodTitleImg":
      query = "update good set img='' where id = ?;";
      arr = [ good_id ];
      break;
  }
  connection.query(query, arr, function(err, rows, fields){
    if(err)
      throw err;
    console.log('The solution is: ', rows);
    console.log('The fields is: ', fields);
    if(rows.affectedRows == 1){
      res.send({ mes: "success", data: { target: obj.target, good_id } }); 
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