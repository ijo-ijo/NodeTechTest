'use strict';
let express = require('express');
let router = express.Router();
let CampaignService = require('../services/CampaignService.js');

/* GET React page */
router.get('/', function(req, res) {
    res.render('react', { title: 'React', type:'React' });
});

module.exports = router;
