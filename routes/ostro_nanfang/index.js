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

router.use("/ostro_nanfang", express.static("routes/ostro_nanfang"));
// router.use("/ostro_nanfang/image", express.static("routes/ostro_nanfang/image"));
router.get('/ostro_nanfang/main_data', require('./main_data'));
router.get('/ostro_nanfang/show_contact', require('./show_contact'));
router.post('/ostro_nanfang/onlogin', require('../login'));
router.post('/ostro_nanfang/contact', require('./contact'));
router.post('/ostro_nanfang/changeContact', require('./changeContact'));
router.post('/ostro_nanfang/changeOthers', require('./changeOthers'));
router.post('/ostro_nanfang/addGood', require('./addGood'));
router.post('/ostro_nanfang/removeGood', require('./removeGood'));
router.post('/ostro_nanfang/updateGoodMes', require('./updateGoodMes'));
router.post('/ostro_nanfang/uploadImg', cpUpload, require('./uploadImg'));
router.post('/ostro_nanfang/deleteImg', cpUpload, require('./deleteImg'));


module.exports = router;