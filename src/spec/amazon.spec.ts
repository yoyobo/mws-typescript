///<reference path="../../typings/main.d.ts"/>

import moment = require('moment');
import Amazon = require('../amazon/api');
import util = require('util');
var xmlParse = require('xml2js').parseString;
import AmazonTypes = require('../amazon/types');
import fs = require('fs');
import _ = require('underscore');

describe('Amazon', function() {

    var amazon: Amazon.MWS = new Amazon.MWS();

    it('can list orders.', function(done) {
        var req: AmazonTypes.ListOrdersRequest = {
            CreatedAfter: moment().subtract(24, 'hours'),
            'MarketplaceId.Id': [AmazonTypes.MarketplaceId.A1PA6795UKMFR9],
            'OrderStatus.Status': [AmazonTypes.OrderStatus.Shipped],
        };

        amazon.Orders.listOrders(req, function(err, result) {
            console.log('error', err);
            console.log('first of ' + result.orderList.length + ' orders: ', result.orderList[0]);
            expect(err).toBeFalsy();
            done();
        });
    });

    // it('can get order items.', function(done) {
    //     var req: AmazonTypes.ListOrderItemsRequest = {
    //         AmazonOrderId: '303-3209187-3328346'
    //     };
    //
    //     amazon.Orders.listOrderItems(req, function(err, result) {
    //         console.log('error', err);
    //         console.log('first of ' + result.orderItemList.length + ' order items: ', result.orderItemList[0]);
    //         expect(err).toBeFalsy();
    //         done();
    //     });
    // });
    //
    // it('can request a report.', function(done) {
    //     var req: AmazonTypes.RequestReportRequest = {
    //         ReportType: '_GET_FLAT_FILE_OPEN_LISTINGS_DATA_',
    //         'MarketplaceIdList.Id': [AmazonTypes.MarketplaceId.A1PA6795UKMFR9]
    //     };
    //
    //     amazon.Reports.requestReport(req, function(err, result) {
    //         console.log('error', err);
    //         console.log('ReportRequestResult: ', result.reportRequestInfo);
    //         expect(err).toBeFalsy();
    //         done();
    //     });
    // });
    //
    // it('can get report request list.', function(done) {
    //     var req: AmazonTypes.GetReportRequestListRequest = {
    //         'ReportTypeList.Type': [AmazonTypes.ReportType._GET_FLAT_FILE_OPEN_LISTINGS_DATA_, AmazonTypes.ReportType._GET_FLAT_FILE_ORDERS_DATA_]
    //     };
    //
    //     amazon.Reports.getReportRequestList(req, function(err, result) {
    //         console.log('error', err);
    //         console.log('First of ' + result.reportRequestInfoList.length + ' GetReportRequestListResult: ', result.reportRequestInfoList[0]);
    //         expect(err).toBeFalsy();
    //         done();
    //     });
    // });
    //
    // it('can get a report.', function(done) {
    //     var req: AmazonTypes.GetReportRequest = {
    //         ReportId: '2273836229016933'
    //     };
    //
    //     amazon.Reports.getReport(req, function(err, result) {
    //         console.log('error', err);
    //         console.log('First 200 chars of result:', result.substring(0, 200));
    //         expect(err).toBeFalsy();
    //         done();
    //     })
    //
    // });
    //
    // it('can submit a feed', function(done) {
    //     var req: AmazonTypes.SubmitFeedRequest = {
    //         FeedType: AmazonTypes.FeedType._POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA_
    //     };
    //
    //     var body: AmazonTypes.BodyData = {
    //         data: fs.readFileSync(__dirname + '/../../testfeed_de.txt', 'utf-8'), // only for testing, content should have right encoding later
    //         'content-type': AmazonTypes.FeedContentType['text/tab-separated-values; charset=iso-8859-1']
    //     };
    //
    //     amazon.Feeds.submitFeed(req, body, function(err, result) {
    //         console.log('error', err);
    //         console.log('FeedSubmissionResult: ', result.feedSubmissionData);
    //         expect(err).toBeFalsy();
    //         done();
    //     });
    // })
    //
    // it('can get a feed submission list', function(done) {
    //     var req: AmazonTypes.GetFeedSubmissionListRequest = {
    //         'FeedSubmissionIdList.Id': ['104136016933', '104134016933']
    //     };
    //
    //     amazon.Feeds.getFeedSubmissionList(req, function(err, result) {
    //         console.log('error', err);
    //         console.log('First of ' + result.feedSubmissionList.length + ' feed submission results:', result.feedSubmissionList[0]);
    //         expect(err).toBeFalsy();
    //         done();
    //     });
    // });
    //
    // it('can get a feed submission result', function(done) {
    //     var req: AmazonTypes.GetFeedSubmissionResultRequest = {
    //         // FeedSubmissionId : '104146016933'
    //         FeedSubmissionId: '104139016933'
    //     };
    //
    //     amazon.Feeds.getFeedSubmissionResult(req, function(err, result) {
    //         console.log('error', err);
    //         console.log('result (possibly truncated):', _.isString(result) ? result.substring(0, 500) : result);
    //         expect(err).toBeFalsy();
    //         done();
    //     });
    // });
});
