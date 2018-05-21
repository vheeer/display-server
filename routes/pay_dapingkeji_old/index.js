'use strict';

const fs = require("fs");//操作文件
const multer = require('multer');//接收图片
const express = require('express');
const router = express.Router();
const config = require('./config');
const path = require("path");
let { project } = config;
const upload = multer({
    dest: 'img_tmp/'
});//定义图片上传的临时目录
var cpUpload = upload.fields([{ name: 'uploadCaseImg', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

router.use("/" + project, express.static("routes/" + project + ""));
// router.use("/+ project +/image", express.static("routes/+ project +/image"));
router.get('/' + project + '/main_data', require('./main_data'));
router.get('/' + project + '/show_contact', require('./show_contact'));
router.post('/' + project + '/onlogin', require('../login'));
router.post('/' + project + '/contact', require('./contact'));
router.post('/' + project + '/changeContact', require('./changeContact'));
router.post('/' + project + '/changeOthers', require('./changeOthers'));
router.post('/' + project + '/addGood', require('./addGood'));
router.post('/' + project + '/removeGood', require('./removeGood'));
router.post('/' + project + '/updateGoodMes', require('./updateGoodMes'));
router.post('/' + project + '/uploadImg', cpUpload, require('./uploadImg'));
router.post('/' + project + '/deleteImg', require('./deleteImg'));
router.post('/' + project + '/login', require('./login'));
router.post('/' + project + '/user_login', require('./user_login'));
router.post('/' + project + '/user_register', require('./user_register'));
router.post('/' + project + '/user_logout', require('./user_logout'));


module.exports = router;