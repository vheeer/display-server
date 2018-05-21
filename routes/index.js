'use strict';

const express = require('express');
const router = express.Router();

// router.get('/', require('./welcome'));
// router.get('/login', require('./login'));
// router.get('/user', require('./user'));
// router.all('/tunnel', require('./tunnel'));

router.get('/goods', require('./goods'));
router.post('/onlogin', require('./login'));
router.post('/mylogin', require('./mylogin'));
//router.post('/contact', require('./contact'));
router.get('/show_contact', require('./show_contact'));

router.use('/', require('./ostro_nanfang'));
router.use('/', require('./ostro_dapingkeji'));
router.use('/', require('./pay_dapingkeji'));


module.exports = router;