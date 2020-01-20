//var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let should = chai.should();
let CampaignService = require('../services/CampaignService.js');
var assert = require('chai').assert;
let allCampaigns = [];
let matchedCampaigns = [];

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(favicon(__dirname + '/public/favicons/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

// sample test
describe('Array test', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.isArray(allCampaigns,);
        });
    });
});

// Chai unit tests
chai.use(chaiHttp);
//Our parent block
describe('Campaigns', () => {
    before(() => {
        var campaignService = new CampaignService();
        campaignService.getCampaigns().then(
            (data) => {
                //console.log('data:', data);
                allCampaigns = data;
                //done();
            },
            (err) => {
                console.log('error');
                done('Error');
            }
        );
        campaignService.getMatchedCampaigns().then(
            (data) => {
                //console.log('data:', data);
                matchedCampaigns = data;
                //done();
            },
            (err) => {
                console.log('error');
                done('Error');
            }
        );
    });
    describe('AllCampaigns is array', () => {
        it('should return true if it\'s array', function () {
            assert.isArray(allCampaigns, "is array");
        });
    });
    describe('AllCampaigns is not array', () => {
        it('should return true if it\'s not array', function () {
            assert.isNotArray(allCampaigns, "is not array");
        });
    });
    describe('MatchedCampaigns is array', () => {
        it('should return true if it\'s array', function () {
            assert.isArray(matchedCampaigns, "is array");
        });
    });
    describe('MatchedCampaigns is not array', () => {
        it('should return true if it\'s not array', function () {
            assert.isNotArray(matchedCampaigns, "is not array");
        });
    });

    describe('Contains mached = true', function () {
        it('should return 1 when the value is present', function () {
            assert.include(allCampaigns, { "matched": "true" }, 'object contains property');
        });
    });

    //beforeEach((done) => {
    //    var campaignService = new CampaignService();
    //    campaignService.getCampaigns().then(
    //        (data) => {
    //            //console.log('data:', data);
    //            allCampaigns = data;
    //            //done();
    //        },
    //        (err) => {
    //            console.log('error');
    //            done('Error');
    //        }
    //    );
    //    campaignService.getMatchedCampaigns().then(
    //        (data) => {
    //            //console.log('data:', data);
    //            matchedCampaigns = data;
    //            //done();
    //        },
    //        (err) => {
    //            console.log('error');
    //            done('Error');
    //        }
    //    );
    //});

    //before(function () {
    //    // runs before all tests in this block
    //});

    //after(function () {
    //    // runs after all tests in this block
    //});

    //beforeEach(function () {
    //    // runs before each test in this block
    //});

    //afterEach(function () {
    //    // runs after each test in this block
    //});
    /*
      * Test the /GET route
      */
    describe('/GET /campaigns/all', () => {
        it('it should GET all the Campaigns', (done) => {
            chai.request(server)
                .get('/campaigns/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.notbe.eql(0);
                    done();
                });
        });
    });

    describe('/GET /campaigns/matched', () => {
        it('it should GET matched Campaigns', (done) => {
            chai.request(server)
                .get('/campaigns/matched')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.notbe.eql(0);
                    done();
                });
        });
    });
});