'use strict';
let express = require('express');
let router = express.Router();
let CampaignService = require('../services/CampaignService.js');

/* GET Campaign json. */
router.get('/', function (req, res) {
    // GET '/campaigns/matched'
    if (req.baseUrl.toLowerCase() == '/campaigns/matched') {
        new CampaignService().getMatchedCampaigns().then(function (data) {
            res.json(data);
        }, function (error) {
            res.sendStatus(401).send({ 'status': 0, 'error': error });
        });
    // GET '/campaigns/all'
    } else if (req.baseUrl.toLowerCase() == '/campaigns/all') {
        new CampaignService().getCampaigns().then(function (data) {
            res.json(JSON.parse(data));
        }, function (error) {
            res.sendStatus(401).send('Error: ' + error);
        });
    // GET any other request --> 404
    } else {
        res.sendStatus(404).send('Not found');
    }
});

module.exports = router;
