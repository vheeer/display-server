'use strict';
const config = require("./config");
const fs = require("fs");//操作文件
const multer = require('multer');//接收图片
const express = require('express');
const router = express.Router();
const path = require("path");
const upload = multer({
    dest: 'img_tmp/'
});//定义图片上传的临时目录
var cpUpload = upload.fields([{ name: 'uploadCaseImg', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

router.use('/' + config.project, express.static("routes/" + config.project));
// router.use("/ostro_dapingkeji/image", express.static("routes/ostro_dapingkeji/image"));
router.get('/' + config.project + '/main_data', require('./main_data'));
router.get('/' + config.project + '/show_contact', require('./show_contact'));
router.post('/' + config.project + '/onlogin', require('../login'));
router.post('/' + config.project + '/contact', require('./contact'));
router.post('/' + config.project + '/changeContact', require('./changeContact'));
router.post('/' + config.project + '/changeOthers', require('./changeOthers'));
router.post('/' + config.project + '/addGood', require('./addGood'));
router.post('/' + config.project + '/removeGood', require('./removeGood'));
router.post('/' + config.project + '/updateGoodMes', require('./updateGoodMes'));
router.post('/' + config.project + '/uploadImg', cpUpload, require('./uploadImg'));
router.post('/' + config.project + '/deleteImg', require('./deleteImg'));
router.post('/' + config.project + '/login', require('./login'));
router.post('/' + config.project + '/user_login', require('./user_login'));
router.post('/' + config.project + '/user_logout', require('./user_logout'));
router.post('/' + config.project + '/user_register', require('./user_register'));
router.post('/' + config.project + '/user_changePSD', require('./user_changePSD'));
router.post('/' + config.project + '/upDateServiceDesc', require('./upDateServiceDesc'));


module.exports = router;