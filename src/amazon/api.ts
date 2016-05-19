import _ = require('underscore');
import moment = require('moment');

import AmazonTypes = require('./types');
import Orders = require('./orders');
import Reports = require('./reports');
import Feeds = require('./feeds');

class MWS {
    public credentials: AmazonTypes.Credentials;
    constructor() {
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

    public Orders: Orders.Orders;

    public Reports: Reports.Reports;

    public Feeds: Feeds.Feeds;
}
