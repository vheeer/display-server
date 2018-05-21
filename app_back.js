'use strict';

require('./globals');
require('./setup-qcloud-sdk');

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');
const fs = require('fs');
const app = express();
const request = require('request');
const crypto = require("crypto");

const API_codeForSession_key = "https://api.weixin.qq.com/sns/jscode2session";
const API_prepay = "https://api.mch.weixin.qq.com/pay/unifiedorder";
const mykey = "dapingkejiviewdapingkejiviewdapi";
const wxKey = "192006250b4c09247ec02edce69f6a2d";

//node version test
let o = { a: 1 };
let { a } = o;

//远程调试
let inLocal = false;
inLocal = true;

app.set('query parser', 'simple');
app.set('case sensitive routing', true);
app.set('jsonp callback name', 'callback');
app.set('strict routing', true);
app.set('trust proxy', true);

app.disable('x-powered-by');

// 记录请求日志
app.use(morgan('tiny'));

// parse `application/x-www-form-urlencoded`
app.use(bodyParser.urlencoded({ extended: true }));

// parse `application/json`
app.use(bodyParser.json());

//发送静态资源
//app.use(express.static("/" + './dist'));
app.use("/", express.static("" + './photos'));
//app.use("/", express.static("" + './dist'));

app.get('/a', function(req, res){
  res.send("req.keys");
});

// app.get("/*", function(req, res) {
//   let imgMime = ["jpg", "jpeg", "png", "gif", "wepp"];
//   let mime = req.path.split(".")[1];
//   let isImg = ["jpg", "jpeg", "png", "gif", "wepp"].indexOf(mime) > -1;
//   //res.send(isImg);
//   if(isImg)
//     ;
//   else
//     req.next();
// });


if(inLocal)
  app.use('/', require('./routes'));
else {
  app.post('/*', function(req, res) {
    // res.send(req.body);
    request.post({
      url: "http://39.106.119.253" + req.url,
      form: req.body
    },(error, response, body) => {
      res.send(body);
    });
    res.header("Access-Control-Allow-Origin", "*");
    //res.send(req.body);
  });

  app.get('/*', function(req, res) {
    if(req.path.indexOf(".jpg") > -1)
    {
      //res.send(require('./routes/ostro_nanfang/image/首页大图_1.jpg'));
    }
    request("http://39.106.119.253" + req.url, (error, response, body) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(body);
    });
  });
}


// 打印异常日志
process.on('uncaughtException', error => {
  console.log(error);
  var w_data = new Buffer("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrror");
  fs.writeFile("." + '/test.txt', w_data, {flag: 'a'}, function (err) {
    if(err) {
      console.error(err);
    } else {
      console.log('写入成功');
    }
  });
});

// 启动server
// http.createServer(app).listen(config.port, () => {
//     console.log('Express server listening on port: %s', config.port);
// });
