'use strict';
const config = require('./config');
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
  let { user_id } = require("./tools/getID")( req );
  const body = req.body;
  let random = new Date().getTime() + '-' + parseInt(Math.random()*10000) + '-';
  const targetPath = upload_image_dir + random + file.originalname;
  const targetAPI = host + "/" + upload_image_dir_child + "/" + random + file.originalname;
  
  fs.rename(file.path, targetPath, function(err) {
      if(err || !body.target) {
        throw err;
      }
      switch (body.target)
      {
        case "onlyAddImg":
          break;
      }
      if(1){
        res.send({ mes: "success", data: { url: targetAPI } });
        console.log('上传成功!');
      }else{
        res.send({ mes: "fail" });
        console.log('上传失败!');
      }
  })
  // res.writeHead(200, {
  //     "Access-Control-Allow-Origin": "*"
  // });
  // res.end(JSON.stringify(file)+JSON.stringify(req.body));
};