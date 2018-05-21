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
  
  console.log(req.files);
  console.log(req.body);
  let field = JSON_firstKey(req.files);
  let file = JSON_firstValue(req.files)[0];
  console.log(field);
  let user_id = req.cookies.id;
  if(req.headers["origin"] == "http://localhost:8000"){
    user_id = 1;
  }else{
    user_id = user_id;
  }
  const body = req.body;
  let random = new Date().getTime() + '-' + parseInt(Math.random()*10000) + '-';
  const targetPath = upload_image_dir + random + file.originalname;
  const targetAPI = host + "/" + upload_image_dir_child + "/" + random + file.originalname;
  
  fs.rename(file.path, targetPath, function(err) {
      if(err || !body.target) {
        throw err;
      }
      let query = "";
      let arr = [];
      switch (body.target)
      {
        case "caseImgs":
          query = "insert into case_img ( url, create_time, user_id )values(?, now(), ?)";
          arr = [ targetAPI, user_id ];
          break;
        case "serviceImgs":
          query = "insert into service_img ( url, create_time, user_id )values(?, now(), ?)";
          arr = [ targetAPI, user_id ];
          break;
        case "bannarImgs":
          query = "update mess set bannar_img = ? where user_id = ?;";
          arr = [ targetAPI, user_id ];
          break;
        case "showBannarImg":
          query = "update mess set show_img = ? where user_id = ?;";
          arr = [ targetAPI, user_id ];
          break;
        case "serviceBannarImg":
          query = "update mess set service_img = ? where user_id = ?;";
          arr = [ targetAPI, user_id ];
          break;
        case "companyBannarImg":
          query = "update mess set company_img = ? where user_id = ?;";
          arr = [ targetAPI, user_id ];
          break;
        case "cultureBannarImg":
          query = "update mess set culture_img = ? where user_id = ?;";
          arr = [ targetAPI, user_id ];
          break;
        case "contactBannarImg":
          query = "update mess set contact_us_img = ? where user_id = ?;";
          arr = [ targetAPI, user_id ];
          break;
        case "goodImg":
          query = "insert into good_img (good_id, url, create_time)values(?, ?, now());";
          arr = [ body.good_id, targetAPI ];
          break;
        case "goodTitleImg":
          query = "update good set img = ? where id = ?";
          arr = [ targetAPI, body.good_id ];
          break;
      }
      connection.query(query, arr, function(err, rows, fields){
        if(err)
          throw err;
        console.log('The solution is: ', rows);
        console.log('The fields is: ', fields);
        res.header('Access-Control-Allow-Origin', '*');  
        if(rows.affectedRows == 1){
          res.send({ mes: "success", data: { insertId: rows.insertId, url: targetAPI, good_id: body.good_id } });
          console.log('上传成功!');
        }else{
          res.send({ mes: "fail" });
          console.log('上传失败!');
        }
      });
  })
  // res.writeHead(200, {
  //     "Access-Control-Allow-Origin": "*"
  // });
  // res.end(JSON.stringify(file)+JSON.stringify(req.body));
};