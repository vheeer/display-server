'use strict';
const config = require('../config');
const fs = require("fs");
const request = require("request");
const crypto = require("crypto");
const ostroTool = require("../ostroTool/ostroTool");

let raw1 = ostroTool.raw1;
let getXMLNodeValue = ostroTool.getXMLNodeValue;
let sign = ostroTool.sign;

const API_codeForSession_key = "https://api.weixin.qq.com/sns/jscode2session";
const API_prepay = "https://api.mch.weixin.qq.com/pay/unifiedorder";
const mykey = "dapingkejiviewdapingkejiviewdapi";
const wxKey = "192006250b4c09247ec02edce69f6a2d";
const myIp = "111.30.252.31";

module.exports = (req, res) => {
    console.log("code is :", req.body.code);
    let ip  = req.ip;
    //调试
    ip = myIp;
    let appid = "wx836724270ae7aa3f";
    let secret = "d70ec4292f73ed135e468f461fabcaac";
    let js_code = req.body.code;
    let authorization_code = "authorization_code";
    //let _t
    let url = API_codeForSession_key + "?appid=" + appid + "&secret=" + secret + "&js_code=" + js_code + "&grant_type=" + "&authorization_code";
    console.log(url);
    //请求获取openid和session_key
    function mkPro()
    {
        let promise = new Promise(function(resolve, reject){
            request.get(url, function (error, response, _body) {
                if(error){
                    reject(error, response, _body);
                }
                console.log("start to get openid");
                console.log("_body: ", _body)
                resolve({error, response, _body});
            });
        });
        return promise;
    }
    function mkPro1()
    {
        let promise = new Promise(function(resolve, reject){
        request.get(url, function (error, response, _body) {
            
        console.log("get openid error: ", error);
        console.log("_body: ", _body);
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
            console.log(myObj);
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
            console.log("start to get prepay_id");
            resolve({err,response,body});
          });
          }
        
        });
        });
        return promise;
    }

    mkPro()
    .then(function(){
        return mkPro1();
    })
    .then(function({err,response,body}){
                console.log("get prepay_id error: ", err);
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
                        res.send({ 
                          timeStamp: ret.timeStamp, 
                          nonceStr: ret.nonceStr,
                          package: ret.package,
                          signType: ret.signType,
                          paySign: _paySignjs
                        });
                    }
              })
    .catch((error) => {
      console.log("catch error: ", error);
    });
;

};