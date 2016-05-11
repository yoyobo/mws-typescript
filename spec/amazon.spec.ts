///<reference path="../typings/main.d.ts"/>

import moment = require('moment');
import Amazon = require('../amazon/api');
import util = require('util');
var xmlParse = require('xml2js').parseString;

describe('Amazon', function() {

    var amazon : Amazon.MWS = new Amazon.MWS();

    it('can list orders.', function(done) {
        var req : Amazon.ListOrdersRequest = {
            CreatedAfter: moment().subtract(24, 'hours'),
            'MarketplaceId.Id' : ['A1PA6795UKMFR9']
        };

        amazon.Orders.listOrders(req, function(err, result) {
            console.log('error', err);
            console.log('first of '+result.orderList.length+' orders: ',result.orderList[0]);
            // console.log('raw', result.rawData['ListOrdersResponse']['ListOrdersResult']['Orders']['Order'][0]);
            expect(err).toBeFalsy();
            done();
        });
    });

    it('can get order items.', function(done){
        var req : Amazon.ListOrderItemsRequest = {
            AmazonOrderId : '303-3209187-3328346'
        };

        amazon.Orders.listOrderItems(req, function(err, result){
            console.log('error', err);
            console.log('first of '+result.orderItemList.length+' order items: ',result.orderItemList[0]);
            // console.log('raw data:', result.rawData['ListOrderItemsResponse']['ListOrderItemsResult']['OrderItems']);
            expect(err).toBeFalsy();
            done();
        });
    });

    it('can request a report.', function(done){
        var req : Amazon.RequestReportRequest = {
            ReportType : '_GET_FLAT_FILE_OPEN_LISTINGS_DATA_',
            MarketplaceIdList : ['A1PA6795UKMFR9']
        };

        amazon.Reports.requestReport(req, function(err, result){
            console.log('error', err);
            console.log('ReportRequestResult: ',result.reportRequestInfo);
            expect(err).toBeFalsy();
            done();
        });
    });
});
