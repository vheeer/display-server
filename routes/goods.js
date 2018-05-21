'use strict';
const config = require('../config');
const fs = require("fs");
module.exports = (req, res) => {
  /*
  setTimeout(function(){
      let x = 1;
      x++;
      console.log(x);
      setTimeout(function(){
        x++;
        console.log(x);
      },1000);
  },1000);
*/
    new Promise(function(resolve, reject){
        let x = 1;
        setTimeout(function(){
          resolve(x);
        },1000);
    })
    .then(function(x){
      x++;
      console.log(x);
      var u = "333";
      return new Promise(function(resolve, reject){
          setTimeout(function(){
            resolve({ x, u });
          },1000);
      })
    })
    .then(function({ x, u }){
      x++;
      console.log(u);
    })
    .catch((reason) => {
      console.log('Handle rejected promise ('+reason+') here.');
    })
  let goods = {
    contact: {
        title: "联系我们",
        website: "www.dapingkeji.com",
        contact_1: "18222968176",
        contact_2: "18722564170"
      },
      bannar: {
        img: config.host + '/5291221ee711f.jpg'
      },
      show: {
        img: config.host + '/5839423e771e8_1024_副本.jpg'
      },
      service: {
        img: config.host + '/5861130f6c8de_1024_副本.jpg'
      },
      goods: [
        
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
      
  }
  res.send(goods);

};