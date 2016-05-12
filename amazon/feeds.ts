import _ = require('underscore');
import moment = require('moment');
import AmazonTypes = require('./types');
import Request = require('./request');

export class Feeds {
    private endpoint: string = '/';
    private version: string = '2009-01-01';

    constructor(private credentials: AmazonTypes.Credentials) {

    }

    public submitFeed(options: AmazonTypes.SubmitFeedRequest, body: AmazonTypes.BodyData, callback: (err?: AmazonTypes.Error, result?: AmazonTypes.FeedSubmissionResult) => void) {
        var request: Request.Request = new Request.Request(this.endpoint, this.credentials);

        request.addParam(new AmazonTypes.StringParameter('Action', 'SubmitFeed'));
        request.addParam(new AmazonTypes.StringParameter('Merchant', this.credentials.sellerId));
        request.addParam(new AmazonTypes.StringParameter('Version', this.version));

        request.addParam(new AmazonTypes.StringParameter('FeedType', AmazonTypes.FeedType[options.FeedType]));

        if (_.has(options, 'MarketplaceIdList.Id')) {
            request.addParam(new AmazonTypes.ListParameter('MarketplaceIdList.Id', _.map(options['MarketplaceIdList.Id'], function(item) {
                return AmazonTypes.MarketplaceId[item];
            })));
        }

        if (_.has(options, 'PurgeAndReplace'))
            request.addParam(new AmazonTypes.BooleanParameter('PurgeAndReplace', options.PurgeAndReplace));

        request.setBody(body);

        request.send(function(err, result) {
            if (err)
                callback(err);
            else
                callback(null, new AmazonTypes.FeedSubmissionResult(result));
        });
    }

    public getFeedSubmissionList(options: AmazonTypes.GetFeedSubmissionListRequest, callback: (err?: AmazonTypes.Error, result?: AmazonTypes.GetFeedSubmissionListResult) => void) {
        var request: Request.Request = new Request.Request(this.endpoint, this.credentials);

        request.addParam(new AmazonTypes.StringParameter('Action', 'GetFeedSubmissionList'));
        request.addParam(new AmazonTypes.StringParameter('Merchant', this.credentials.sellerId));
        request.addParam(new AmazonTypes.StringParameter('Version', this.version));

        if (_.has(options, 'FeedSubmissionIdList.Id'))
            request.addParam(new AmazonTypes.ListParameter('FeedSubmissionIdList.Id', options['FeedSubmissionIdList.Id']));

        if (_.has(options, 'MaxCount'))
            request.addParam(new AmazonTypes.StringParameter('MaxCount', options.MaxCount.toString()));

        if (_.has(options, 'FeedTypeList.Type')) {
            request.addParam(new AmazonTypes.ListParameter('FeedTypeList.Type', _.map(options['FeedTypeList.Type'], function(item) {
                return AmazonTypes.FeedType[item];
            })));
        }

        if (_.has(options, 'FeedProcessingStatusList.Status')) {
            request.addParam(new AmazonTypes.ListParameter('FeedProcessingStatusList.Status', _.map(options['FeedProcessingStatusList.Status'], function(item) {
                return AmazonTypes.FeedProcessingStatus[item];
            })));
        }

        if (_.has(options, 'SubmittedFromDate'))
            request.addParam(new AmazonTypes.TimestampParameter('SubmittedFromDate', options.SubmittedFromDate));

        if (_.has(options, 'SubmittedToDate'))
            request.addParam(new AmazonTypes.TimestampParameter('SubmittedToDate', options.SubmittedToDate));

        request.send(function(err, result) {
            if (err)
                callback(err);
            else
                callback(null, new AmazonTypes.GetFeedSubmissionListResult(result));
        });

    }
}
