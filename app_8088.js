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
// Object.prototype.show = function()
// {
//  let out = "";
//  for(let x in this)
//  {
//    out += "<span style='color: blue;'>" + x + "</span>: " + this[x] + " __<br>";
//  }
//  return out;
// }
// String.prototype.write = function()
// {
//  var w_data = new Buffer(this);
//  fs.writeFile(__dirname + '/test.txt', w_data+"\r\n", {flag: 'a'}, function (err) {
//      if(err) {
//        console.error(err);
//      } else {
//        console.log('写入成功');
//      }
//  });
// }
// function paysignjsapi(appid,attach,_body,mch_id,nonce_str,notify_url,openid,total_fee,'JSAPI') {
//     var ret = {
//         appid: appid,
//         attach: attach,
//         body: _body,
//         mch_id: mch_id,
//         nonce_str: nonce_str,
//         notify_url:notify_url,
//         openid:openid,
//         out_trade_no:out_trade_no,
//         spbill_create_ip:spbill_create_ip,
//         total_fee:total_fee,
//         trade_type:trade_type
//     };
//     var string = raw1(ret);
//     var key = _key;
//     string = string + '&key='+key;
//     var crypto = require('crypto');
//     return crypto.createHash('md5').update(string,'utf8').digest('hex');
// };
function getXMLNodeValue(node_name,xml){
    var tmp = xml.split("<"+node_name+">");
    var _tmp = tmp[1].split("</"+node_name+">");
    return _tmp[0];
};
// function sss(appid,nonceStr,myPackage,signType,timeStamp) {
//     var ret = {
//         appId: appid,
//         nonceStr: nonceStr,
//         myPackage:myPackage,
//         signType:signType,
//         timeStamp:timeStamp
//     };
//     var string = raw1(ret);
//     var key = _key;
//     string = string + '&key='+key;
//     console.log(string);
//     var crypto = require('crypto');
//     return crypto.createHash('md5').update(string,'utf8').digest('hex');
// }
function raw1(args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key] = args[key];
  });
  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};
function sign(obj, key) {
    //对象字典序转参数字符串
    var stringA = raw1(obj);
    //字符串添加商户秘钥字段
    var stringSignTemp = stringA + "&key=" + key; //注：key为商户平台设置的密钥key 
    //签名算法
    //var sign=MD5(stringSignTemp).toUpperCase() //注：MD5签名方式
    var sign = crypto.createHash('md5').update(stringSignTemp,'utf8').digest('hex').toUpperCase();

    console.log(stringA);
    return sign;
}



app.set('query parser', 'simple');
app.set('case sensitive routing', true);
app.set('jsonp callback name', 'callback');
app.set('strict routing', true);
app.set('trust proxy', true);

app.disable('x-powered-by');

// 记录请求日志
app.use(morgan('tiny'));

//发送图片
app.use(express.static("" + './photos'));

// parse `application/x-www-form-urlencoded`
app.use(bodyParser.urlencoded({ extended: true }));

// parse `application/json`
app.use(bodyParser.json());

app.use('/', require('./routes'));

// app.post('/onlogin', function(req, res) {
//     console.log(req.query);
//     console.log(req.body.name);
//     console.log(req.body.tel);
//     let appid = "wx836724270ae7aa3f";
//     let secret = "";
//     let js_code = req.body.code;
//     let authorization_code = "authorization_code";
//     //let _t
//     let url = API_codeForSession_key + "?appid=" + appid + "&secret=" + secret + "&js_code=" + js_code + "&grant_type=" + "&authorization_code";
//     console.log(url);
//     request(url, function (error, response, body) {
//      console.log(error);
//    if (!error && response.statusCode == 200) {
//      res.send(body);
//    }
//  });
//     res.send(body);
// });

app.post('/onlogin', function(req, res) {
    console.log(req.query);
    console.log(req.body.name);
    console.log(req.body.tel);
    let  ip  = req.ip;
    let appid = "wx836724270ae7aa3f";
    let secret = "d70ec4292f73ed135e468f461fabcaac";
    let js_code = req.body.code;
    let authorization_code = "authorization_code";
    //let _t
    let url = API_codeForSession_key + "?appid=" + appid + "&secret=" + secret + "&js_code=" + js_code + "&grant_type=" + "&authorization_code";
    console.log(url);
    //请求获取openid和session_key
    request.get(url, function (error, response, _body) {
    console.log(error);
    if (!error && response.statusCode == 200) {
      let url_body = _body;
      let parseBody = JSON.parse(url_body);
      let session_key = parseBody.session_key;

      let openid = parseBody.openid;
        var appid = "wx836724270ae7aa3f";
        var mch_id = "1494794472";
        var nonce_str = "_nonce_str";
        var total_fee = 1;
        var notify_url = "https://14321283.dapingkeji.com/onlogin1";
        var body = "body";
        var trade_type = "JSAPI";
        var out_trade_no = "ostro" + parseInt(Math.random() * 10000);
        var spbill_create_ip = ip;
        var timeStamp = parseInt(new Date().getTime()/1000);

        var myObj = {
          appid,body,mch_id,nonce_str,notify_url,openid,total_fee,trade_type,out_trade_no,spbill_create_ip
        };
        var wxObj = {
          appid: "wxd930ea5d5a258f4f" ,
        mch_id: 10000100 ,
        device_info: 1000 ,
        body: "test" ,
        nonce_str: "ibuaiVcKdpRxkhJA" 
      };

        //var wxSign = sign(wxObj, wxKey);
        var mySign = sign(myObj, mykey);

      var formData  = "<xml>";
        formData  += "<appid>"+appid+"</appid>";
        formData  += "<mch_id>"+mch_id+"</mch_id>";
        formData  += "<nonce_str>"+nonce_str+"</nonce_str>"; 
        formData  += "<body>"+body+"</body>";
        formData  += "<total_fee>"+total_fee+"</total_fee>";
        formData  += "<trade_type>JSAPI</trade_type>";
        formData  += "<spbill_create_ip>"+ip+"</spbill_create_ip>";
        formData  += "<notify_url>"+notify_url+"</notify_url>";
        formData  += "<out_trade_no>"+out_trade_no+"</out_trade_no>";
        formData  += "<openid>"+openid+"</openid>";
        formData  += "<sign>"+mySign+"</sign>";
        formData  += "</xml>";
        //res.send(openid);
      request.post({
        url: API_prepay, 
        body: formData
      },function(err,response,body) {
        if(!err && response.statusCode == 200){
                console.log(body);
                var prepay_id_node = getXMLNodeValue('prepay_id',body.toString("utf-8"));
                var tmp = prepay_id_node.split('[');

                let prepay_id = tmp[2].split(']')[0];
                //let appId = appid;
                //let timeStamp = parseInt(new Date().getTime()/1000);
                //let nonceStr = "ostro" + parseInt(Math.random() * 10000);

                var ret = {
                appId: appid,
                nonceStr: nonce_str,
                package: "prepay_id="+prepay_id,
                signType: "MD5",
                timeStamp: timeStamp
            };


                //签名
                let _paySignjs = sign(ret, mykey);
                //res.render('jsapipay',{prepay_id:tmp1[0],_paySignjs:_paySignjs});
                res.send({ 
                  timeStamp: ret.timeStamp, 
                  nonceStr: ret.nonceStr,
                  package: ret.package,
                  signType: ret.signType,
                  paySign: _paySignjs
                });
                //res.render('jsapipay',{rows:body});
                //res.redirect(tmp3[0]);
            }
      });
      // request.post(API_prepay, function (error, response, body) {

      //  res.send(body);
      // });

      //res.send(body);

      }
  });
    //res.send(body);
});

app.get('/onlogin1', function(req, res){
  res.send();
});

app.get('/goods', function(req, res){
  let goods = [
      {
        img: config.host + "/1.jpg",
        title: "引流方案",
        desc: "帮助选择商家合适的地理位置，让用户能够在需要的时候迅速通过附近小程序完成使用和下单；并通过技术手段，对商家小程序名称进行关键词优化，实现名称排名考前，获得更大的流量入口。帮助商家完成宣传视频设计，并在小程序发布，进一步留存用户，转化消费。帮助餐厅完成宣传H5页面设计，并帮助商家入驻百度、高德、腾讯等地图，让客户搜索方便，实现餐厅营销升级。新增微信端四个接口，更加方便客户进入小程序，小程序浪潮正式袭来！",        date: new Date().toLocaleString(),
        visit: 48,
        phoneCall: 13538451558,
        goodImgList: [
          //{ url: "https://67668077.yinmudianying.club/171298343251378475.jpg"},
          { url: config.host + "/171298343251378475.jpg"},
          { url: config.host + "/675690409186832942.jpg"},
          { url: config.host + "/740175694513457738.jpg"},
          { url: config.host + "/779439734565593112.jpg"}
        ]
      },
      {
        img: config.host + "/2.jpg",
        title: "展示管理",
        desc: "对商品进行分类，可在线查看所有商品、价格以及所享优惠。在线选择好商品，并在线完成支付，移动支付更加方便快捷。用户可在后台自行选择添加删除商品信息。",
        date: "2017-11-20",
        visit: 48,
        phoneCall: 13538451558,
        goodImgList: [
          { url: config.host + "/697535724670681702.png"},
          { url: config.host + "/386755238818867982.png"},
          { url: config.host + "/"}
        ]
      },
      {
        img: config.host + "/3.jpg",
        title: "服务方案",
        desc: "确保小程序平台能正常运转，内容能得到及时更新，比如域名服务器维护，bug修复，内容更新，产品上下架。策划各类活动以辅助小程序功能的实现，用于吸引欣的粉丝和促进老客户到店消费。设计线下宣传物料，如门贴，桌牌等，用于辅助活动的执行。",
        date: "2017-11-10",
        visit: 148,
        phoneCall: 13538451558,
        goodImgList: [
          { url: config.host + "/647129231368873995.jpg"},
          { url: config.host + "/"},
          { url: config.host + "/"}
        ]
      }
    ]
    res.send(goods);
});


app.get('/*', function(req, res){
  // console.log("all");
  request("http://www.vheeer.com" + req.url, 
      (error, response, body) => {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.
      res.send(body);
  });
  //res.send("all");
});

// 打印异常日志
process.on('uncaughtException', error => {
    console.log(error);
});

// 启动server
http.createServer(app).listen(8088, () => {
    console.log('Express server listening on port: %s', 8088);
});
