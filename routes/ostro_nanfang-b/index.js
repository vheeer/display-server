'use strict';

const express = require('express');
const router = express.Router();
const path = require("path");

router.use("/ostro_nanfang", express.static("routes/ostro_nanfang"));
// router.use("/ostro_nanfang/image", express.static("routes/ostro_nanfang/image"));
router.get('/ostro_nanfang/main_data', require('./main_data'));
router.get('/ostro_nanfang/show_contact', require('./show_contact'));
router.post('/ostro_nanfang/onlogin', require('../login'));
router.post('/ostro_nanfang/contact', require('./contact'));
module.exports = router;