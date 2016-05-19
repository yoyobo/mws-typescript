import AmazonTypes = require('./types');
export declare class Feeds {
    private credentials;
    private endpoint;
    private version;
    constructor(credentials: AmazonTypes.Credentials);
    submitFeed(options: AmazonTypes.SubmitFeedRequest, body: AmazonTypes.BodyData, callback: (err?: AmazonTypes.Error, result?: AmazonTypes.FeedSubmissionResult) => void): void;
    getFeedSubmissionList(options: AmazonTypes.GetFeedSubmissionListRequest, callback: (err?: AmazonTypes.Error, result?: AmazonTypes.GetFeedSubmissionListResult) => void): void;
    getFeedSubmissionResult(options: AmazonTypes.GetFeedSubmissionResultRequest, callback: (err?: AmazonTypes.Error, result?: string) => void): void;
}
