import _ = require('underscore');
import moment = require('moment');

import AmazonTypes = require('./types');
import Orders = require('./orders');
import Reports = require('./reports');
import Feeds = require('./feeds');

export class MWS {
    constructor(public credentials : AmazonTypes.Credentials) {
        this.Orders = new Orders.Orders(this.credentials);
        this.Reports = new Reports.Reports(this.credentials);
        this.Feeds = new Feeds.Feeds(this.credentials);
    }

    public Orders: Orders.Orders;

    public Reports: Reports.Reports;

    public Feeds: Feeds.Feeds;
}
