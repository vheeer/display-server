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
var cookieParser = require("cookie-parser");
const router = express.Router();

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

app.use(cookieParser());

//COOKIE
// app.all('*',function (req, res, next) { 
//   console.log(req.cookie);
//   // res.cookie('acc', 'nanfangxinwujin');
//   next();
// })
// COOKIE
app.all('*', function(req, res, next) {
  let myCookies = req.cookies;
  // let myHeaders = req.headers["host"];
  let myBody = req.body;
  console.log("myCookies is", myCookies);
  // console.log("myHeaders is", myHeaders);
  console.log("myBody is", myBody);
  next();
});

//OPTION请求
app.all('*',function (req, res, next) { 
  // res.header('Access-Control-Allow-Origin', '*');  
  res.header('Access-Control-Allow-Origin', req.headers["origin"]); 
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');  
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');  
  res.header('Access-Control-Allow-Credentials', 'true');
  // res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
  if (req.method == 'OPTIONS') {    
    res.sendStatus(200); //让options请求快速返回/ 
  }  else {
    next();  
  }
});

//端口映射
var proxyMiddleWare = require("http-proxy-middleware");
var proxyPath = "http://localhost:8360";//目标后端服务地址(公司同事电脑地址)
var proxyOption ={ 
  target: proxyPath, 
  changeOrigoin: false,
  pathRewrite: {
    '^/nide': '/'           // 用户请求路径: node请求路径
  },
};
// app.use(express.static("./public"));

app.use("/nide/api",proxyMiddleWare(proxyOption));//这里要注意"/discern" 是匹配的路由,它会将匹配的路由进行转发，没匹配到的就不会转发。('/discern'完全可以写成'/'就是说所有路由都可以访问)
// app.listen(8000);

// app.get("/", function(req, res) {
  // res.send("<html><a href='https://www.dapingkeji.com/admin_v1.0.0/#/admin/products'>后台管理v1.0.0</a><br><a href='https://www.dapingkeji.com/admin_v1.0.1/#/admin/products'>后台管理v1.0.1</a></html>");
// });
//发送静态资源
//app.use(express.static("/" + './dist'));
app.use("/", express.static("" + './routes/pay_dapingkeji/myImage/image/front'));
app.use("/mobile", express.static("" + './routes/pay_dapingkeji/myImage/image/mobile'));
app.use("/web", express.static("" + './routes/pay_dapingkeji/myImage/image/web'));
app.use("/admin_v1.0.0", express.static("" + './dist_v1.0.0'));
app.use("/admin_v1.0.1", express.static("" + './dist_v1.0.1'));
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

// router.get('/goods', require('./goods'));
// if(inLocal)
  app.use('/', require('./routes'));
// else {
  const proxy = "https://www.yinmudianying.club"
  router.post('/proxy/:path', function(req, res) {
    request.post({
      url: proxy + req.url,
      form: req.body
    },(error, response, body) => {
      res.send(body);
    });
  });
  router.get('/proxy', function(req, res) {
    request(proxy, (error, response, body) => {
      res.send(body);
    });
  });
  router.get('/proxy/:path_1/:path_2', function(req, res) {
    if(req.path.indexOf(".jpg") > -1)
    {
      //res.send(require('./routes/ostro_nanfang/image/首页大图_1.jpg'));
    }
    let { path_1, path_2 } = req.params;
    console.log("params is: ", req.params);
    let requestURL = proxy + "/" + path_1 + "/" + path_2;
    request(requestURL, (error, response, body) => {
      res.send(body);
    });
  });
// }
  app.use(router);

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
http.createServer(app).listen(config.port, () => {
    console.log('Express server listening on port: %s', config.port);
});
