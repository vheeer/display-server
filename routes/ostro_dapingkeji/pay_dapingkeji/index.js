'use strict';

const fs = require("fs");//操作文件
const multer = require('multer');//接收图片
const express = require('express');
const router = express.Router();
const path = require("path");
const upload = multer({
    dest: 'img_tmp/'
});//定义图片上传的临时目录
var cpUpload = upload.fields([{ name: 'uploadCaseImg', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

router.use("/ostro_dapingkeji", express.static("routes/ostro_dapingkeji"));
// router.use("/ostro_dapingkeji/image", express.static("routes/ostro_dapingkeji/image"));
router.get('/ostro_dapingkeji/main_data', require('./main_data'));
router.get('/ostro_dapingkeji/show_contact', require('./show_contact'));
router.post('/ostro_dapingkeji/onlogin', require('../login'));
router.post('/ostro_dapingkeji/contact', require('./contact'));
router.post('/ostro_dapingkeji/changeContact', require('./changeContact'));
router.post('/ostro_dapingkeji/changeOthers', require('./changeOthers'));
router.post('/ostro_dapingkeji/addGood', require('./addGood'));
router.post('/ostro_dapingkeji/removeGood', require('./removeGood'));
router.post('/ostro_dapingkeji/updateGoodMes', require('./updateGoodMes'));
router.post('/ostro_dapingkeji/uploadImg', cpUpload, require('./uploadImg'));
router.post('/ostro_dapingkeji/deleteImg', require('./deleteImg'));
router.post('/ostro_dapingkeji/login', require('./login'));
router.post('/ostro_dapingkeji/user_login', require('./user_login'));
router.post('/ostro_dapingkeji/user_logout', require('./user_logout'));
router.post('/ostro_dapingkeji/user_register', require('./user_register'));
router.post('/ostro_dapingkeji/user_changePSD', require('./user_changePSD'));
router.post('/ostro_dapingkeji/upDateServiceDesc', require('./upDateServiceDesc'));


module.exports = router;