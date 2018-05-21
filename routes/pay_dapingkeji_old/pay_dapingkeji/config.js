'use strict';
// import tmp_host from '../../config.js';
const config = require('../../config');
let template = "ostro";
let custom = "dapingkeji";
let project = template + "_" + custom;
let host = config.host + "/" + project;
let host_tmp = config.tmp_host + "/wx_tmp";
let image_dir = host + "/image";
let upload_image_dir_child = "image_1";
let upload_image_dir = "routes/" + project + "/" + upload_image_dir_child + "/";   //"routes/ostro_dapingkeji/image_1/"
// let image_dir_tmp = host_tmp + "/" + project + "/image";
//image_dir = image_dir_tmp;
module.exports = {
	template,
	custom,
	project,
	host,
    host_tmp,
    upload_image_dir_child,
    upload_image_dir,
    port: '80',
};