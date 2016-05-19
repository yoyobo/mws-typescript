import AmazonTypes = require('./types');
export declare class Reports {
    private credentials;
    private endpoint;
    private version;
    constructor(credentials: AmazonTypes.Credentials);
    requestReport(options: AmazonTypes.RequestReportRequest, callback: (err?: AmazonTypes.Error, result?: AmazonTypes.RequestReportResult) => void): void;
    getReportRequestList(options: AmazonTypes.GetReportRequestListRequest, callback: (err?: AmazonTypes.Error, result?: AmazonTypes.GetReportRequestListResult) => void): void;
    getReport(options: AmazonTypes.GetReportRequest, callback: (err?: AmazonTypes.Error, result?: string) => void): void;
}
