'use strict';
let express = require('express');
let router = express.Router();
let CampaignService = require('../services/CampaignService.js');

/* GET AngularJS page. */
router.get('/', function (req, res) {
    res.render('angularjs', { title: 'AngularJS', type: 'AngularJS' });
});

module.exports = router;
