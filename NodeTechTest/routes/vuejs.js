'use strict';
let express = require('express');
let router = express.Router();
let CampaignService = require('../services/CampaignService.js');

/* GET View.js page. */
router.get('/', function(req, res) {
    res.render('vuejs', { title: 'Vue.JS', type: 'Vue.js' });
});

module.exports = router;
