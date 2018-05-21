const crypto = require("crypto");
let raw1 = (args) => {
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
}
module.exports = {
  getXMLNodeValue: (node_name,xml) => {
    var tmp = xml.split("<"+node_name+">");
    var _tmp = tmp[1].split("</"+node_name+">");
    return _tmp[0];
  },
  //console.log("xx");
  raw1,
  sign: (obj, key) => {
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
}