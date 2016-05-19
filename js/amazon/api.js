"use strict";
var Orders = require('./orders');
var Reports = require('./reports');
var Feeds = require('./feeds');
var Amazon;
(function (Amazon) {
    var MWS = (function () {
        function MWS() {
            this.credentials = {
                sellerId: process.env.AMAZON_MERCHANT_ID,
                awsAccountId: process.env.AMAZON_ACCESS_KEY_ID,
                secretKey: process.env.AMAZON_SECRET_ACCESS_KEY,
                host: 'mws.amazonservices.de'
            };
            this.Orders = new Orders.Orders(this.credentials);
            this.Reports = new Reports.Reports(this.credentials);
            this.Feeds = new Feeds.Feeds(this.credentials);
        }
        return MWS;
    }());
    Amazon.MWS = MWS;
})(Amazon || (Amazon = {}));
module.exports = Amazon;
//# sourceMappingURL=api.js.map