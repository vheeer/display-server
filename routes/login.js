'use strict';
const config = require('../config');
const fs = require("fs");
const request = require("request");
const crypto = require("crypto");
//const ostroTool = require("../ostroTool/ostroTool");
const { raw1, getXMLNodeValue, sign } = require("../ostroTool/ostroTool");
const connection = require("../ostroTool/connection");


const API_codeForSession_key = "https://api.weixin.qq.com/sns/jscode2session";
const API_prepay = "https://api.mch.weixin.qq.com/pay/unifiedorder";
const mykey = "dapingkejiviewdapingkejiviewdapi";
const wxKey = "192006250b4c09247ec02edce69f6a2d";
const myIp = "111.30.252.31";

module.exports = (req, res) => {
    
    


    let ip  = req.ip;
    let price = req.body.price;
    //调试
    ip = myIp;
    let appid = "wx836724270ae7aa3f";
    let secret = "d70ec4292f73ed135e468f461fabcaac";
    let js_code = req.body.code;
    let authorization_code = "authorization_code";
    let mch_id = "1494794472";
    let nonce_str = "_nonce_str";
    let total_fee = 55;
    let notify_url = "https://14321283.dapingkeji.com/onlogin1";
    let body = "body";
    let trade_type = "JSAPI";
    let out_trade_no = "ostro" + parseInt(Math.random() * 10000);
    let spbill_create_ip = ip;
    let timeStamp = parseInt(new Date().getTime()/1000);
    let url = API_codeForSession_key + "?appid=" + appid + "&secret=" + secret + "&js_code=" + js_code + "&grant_type=" + "&authorization_code";
    let openid, prepay_id, session_key;
    //console.log(url);
    //通过code,GET获取openid和session_key
    new Promise(function(resovle, reject){
        console.log("code: ", js_code);
        request.get(url, (error, response, _body) => {
            console.log("openid && session_key: ", _body);
            resovle({ error, response, _body });
        });
    })
    //通过openid,POST获取prepay_id
    .then(function({ error, response, _body }){
        return new Promise(function(resovle, reject){
            if (!error && response.statusCode == 200) {
              let url_body = _body;
              let parseBody = JSON.parse(url_body);
              session_key = parseBody.session_key;

              openid = parseBody.openid;

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
                //console.log(myObj);
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
                resovle({ err,response,body });
              });
              }
        });
    })
    //返回prepay_id和参数
    .then(function({ err,response,body }){

        if(!err && response.statusCode == 200){
                var prepay_id_node = getXMLNodeValue('prepay_id',body.toString("utf-8"));
                var tmp = prepay_id_node.split('[');
                let prepay_id = tmp[2].split(']')[0];
                console.log(prepay_id);
                let sol = "";
                connection.query('insert into customer (openid, expire, session_key)values(?, localtime(), ?);', [openid, session_key], function(err, rows, fields) { 
                    if (err) 
                      throw err;  
                    console.log('The solution is: ', rows[0]);
                    sol = rows[0];
                    let result = "" + sol;
                    let data = JSON.stringify(sol);
                    console.log(sol);
                }); 
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
    .catch(function(reason){
        console.log(reason);
    });
};