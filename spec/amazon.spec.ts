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
            // console.log(util.inspect(result['ListOrdersResponse']['ListOrdersResult']['Orders']['Order'], true, 10));
            console.log(result);
            // xmlParse(result, {explicitArray: false}, function(err, result){
            //     console.log('error', err);
            //     // console.log('result',util.inspect(result, true, 10));
            //
            //
            // });
            expect(err).toBeFalsy();
            done();
        })
    })
});
