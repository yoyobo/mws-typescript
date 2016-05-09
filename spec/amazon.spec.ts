///<reference path="../typings/main.d.ts"/>

import moment = require('moment');
import Amazon = require('../amazon/api');

describe('Amazon', function() {
    var amazon : Amazon.MWS = new Amazon.MWS();

    it('can list orders.', function(done) {
        var req : Amazon.ListOrdersRequest = {
            CreatedAfter: moment(),
            'MarketplaceId.Id' : ['A1PA6795UKMFR9']
        };

        amazon.listOrders(req, function(err, result) {
            expect(err).toBeFalsy();
            done();
        })
    })
});