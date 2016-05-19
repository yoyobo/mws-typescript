import AmazonTypes = require('./types');
import Orders = require('./orders');
import Reports = require('./reports');
import Feeds = require('./feeds');
declare module Amazon {
    class MWS {
        credentials: AmazonTypes.Credentials;
        constructor();
        Orders: Orders.Orders;
        Reports: Reports.Reports;
        Feeds: Feeds.Feeds;
    }
}
export = Amazon;
