'use strict';
module.exports = (req, res) => {
  res.cookie('login', '0', { maxAge: 3600*24*1*1000 });
  res.cookie('userName', "userName", { maxAge: -3600*24*1*1000 });
  res.cookie('id', "id", { maxAge: -3600*24*1*1000 });
  res.send({ mes: "success", data: {  } });
};