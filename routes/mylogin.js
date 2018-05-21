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
    console.log(req.body);
    let ip  = req.ip;
    let js_code = req.body.code;
    let appid = "wx836724270ae7aa3f";
    let secret = "d70ec4292f73ed135e468f461fabcaac";
    let url = API_codeForSession_key + "?appid=" + appid + "&secret=" + secret + "&js_code=" + js_code + "&grant_type=" + "&authorization_code";
   
    //通过code,GET获取openid和session_key
    new Promise(function(resovle, reject){
        console.log("code: ", js_code);
        request.get(url, (error, response, _body) => {
            console.log("openid && session_key: ", _body);
            resovle({ error, response, _body });
        });
    })
    //session_3rd,存储入库
    .then(function({ error, response, _body }){
        return new Promise(function(resovle, reject){
            if (!error && response.statusCode == 200) {
                let url_body = _body;
                let parseBody = JSON.parse(url_body);
                let session_key = parseBody.session_key;
                let openid = parseBody.openid;
                let session_3rd = "ostro" + parseInt(Math.random() * 100000) + new Date().getTime();
                connection.query("insert into customer (openid, expire, session_key, session_3rd, appid, create_time )values(?, date_add(localtime(), interval '15 00:00:00' day_second), ?, ?, ?, localtime());", [openid, session_key, session_3rd, appid], function(err, rows, fields) { 
                if (err) {
                    res.send({mes: "fail to login 3rd"});
                  throw err;  
                }
                res.send({mes: "success to login 3rd"});
            }); 
        };
    	});
    })
    //返回prepay_id和参数
    .then(function({ err,response,body }){})
    .catch(function(reason){
        console.log(reason);
    });
};