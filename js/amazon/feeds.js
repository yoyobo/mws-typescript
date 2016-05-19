"use strict";
var _ = require('underscore');
var AmazonTypes = require('./types');
var Request = require('./request');
var Feeds = (function () {
    function Feeds(credentials) {
        this.credentials = credentials;
        this.endpoint = '/';
        this.version = '2009-01-01';
    }
    Feeds.prototype.submitFeed = function (options, body, callback) {
        var request = new Request.Request(this.endpoint, this.credentials);
        request.addParam(new AmazonTypes.StringParameter('Action', 'SubmitFeed'));
        request.addParam(new AmazonTypes.StringParameter('Merchant', this.credentials.sellerId));
        request.addParam(new AmazonTypes.StringParameter('Version', this.version));
        request.addParam(new AmazonTypes.StringParameter('FeedType', AmazonTypes.FeedType[options.FeedType]));
        if (_.has(options, 'MarketplaceIdList.Id')) {
            request.addParam(new AmazonTypes.ListParameter('MarketplaceIdList.Id', _.map(options['MarketplaceIdList.Id'], function (item) {
                return AmazonTypes.MarketplaceId[item];
            })));
        }
        if (_.has(options, 'PurgeAndReplace'))
            request.addParam(new AmazonTypes.BooleanParameter('PurgeAndReplace', options.PurgeAndReplace));
        request.setBody(body);
        request.send(function (err, result) {
            if (err)
                callback(err);
            else
                callback(null, new AmazonTypes.FeedSubmissionResult(result));
        });
    };
    Feeds.prototype.getFeedSubmissionList = function (options, callback) {
        var request = new Request.Request(this.endpoint, this.credentials);
        request.addParam(new AmazonTypes.StringParameter('Action', 'GetFeedSubmissionList'));
        request.addParam(new AmazonTypes.StringParameter('Merchant', this.credentials.sellerId));
        request.addParam(new AmazonTypes.StringParameter('Version', this.version));
        if (_.has(options, 'FeedSubmissionIdList.Id'))
            request.addParam(new AmazonTypes.ListParameter('FeedSubmissionIdList.Id', options['FeedSubmissionIdList.Id']));
        if (_.has(options, 'MaxCount'))
            request.addParam(new AmazonTypes.StringParameter('MaxCount', options.MaxCount.toString()));
        if (_.has(options, 'FeedTypeList.Type')) {
            request.addParam(new AmazonTypes.ListParameter('FeedTypeList.Type', _.map(options['FeedTypeList.Type'], function (item) {
                return AmazonTypes.FeedType[item];
            })));
        }
        if (_.has(options, 'FeedProcessingStatusList.Status')) {
            request.addParam(new AmazonTypes.ListParameter('FeedProcessingStatusList.Status', _.map(options['FeedProcessingStatusList.Status'], function (item) {
                return AmazonTypes.FeedProcessingStatus[item];
            })));
        }
        if (_.has(options, 'SubmittedFromDate'))
            request.addParam(new AmazonTypes.TimestampParameter('SubmittedFromDate', options.SubmittedFromDate));
        if (_.has(options, 'SubmittedToDate'))
            request.addParam(new AmazonTypes.TimestampParameter('SubmittedToDate', options.SubmittedToDate));
        request.send(function (err, result) {
            if (err)
                callback(err);
            else
                callback(null, new AmazonTypes.GetFeedSubmissionListResult(result));
        });
    };
    Feeds.prototype.getFeedSubmissionResult = function (options, callback) {
        var request = new Request.Request(this.endpoint, this.credentials);
        request.addParam(new AmazonTypes.StringParameter('Action', 'GetFeedSubmissionResult'));
        request.addParam(new AmazonTypes.StringParameter('Merchant', this.credentials.sellerId));
        request.addParam(new AmazonTypes.StringParameter('Version', this.version));
        request.addParam(new AmazonTypes.StringParameter('FeedSubmissionId', options.FeedSubmissionId));
        request.send(function (err, result) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, result);
            }
        });
    };
    return Feeds;
}());
exports.Feeds = Feeds;
//# sourceMappingURL=feeds.js.map