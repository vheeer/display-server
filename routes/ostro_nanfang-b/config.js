'use strict';
// import tmp_host from '../../config.js';
const config = require('../../config');
let template = "ostro";
let custom = "nanfang";
let project = template + "_" + custom;
let host = config.host + "/" + project;
let host_tmp = config.tmp_host + "/wx_tmp";
let image_dir = host + "/image";
let image_dir_tmp = host_tmp + "/" + project + "/image";
//image_dir = image_dir_tmp;
module.exports = {
	template,
	custom,
	project,
	host,
    host_tmp,
    image_dir,
    image_dir_tmp,
    port: '80',
};