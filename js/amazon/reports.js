"use strict";
var _ = require('underscore');
var AmazonTypes = require('./types');
var Request = require('./request');
var Reports = (function () {
    function Reports(credentials) {
        this.credentials = credentials;
        this.endpoint = '/';
        this.version = '2009-01-01';
    }
    Reports.prototype.requestReport = function (options, callback) {
        var request = new Request.Request(this.endpoint, this.credentials);
        request.addParam(new AmazonTypes.StringParameter('Action', 'RequestReport'));
        request.addParam(new AmazonTypes.StringParameter('Merchant', this.credentials.sellerId));
        request.addParam(new AmazonTypes.StringParameter('Version', this.version));
        request.addParam(new AmazonTypes.StringParameter('ReportType', options.ReportType));
        if (_.has(options, 'StartDate'))
            request.addParam(new AmazonTypes.TimestampParameter('StartDate', options.StartDate));
        if (_.has(options, 'EndDate'))
            request.addParam(new AmazonTypes.TimestampParameter('EndDate', options.EndDate));
        if (_.has(options, 'ReportOptions'))
            request.addParam(new AmazonTypes.StringParameter('ReportOptions', options.ReportOptions));
        if (_.has(options, 'MarketplaceIdList.Id')) {
            request.addParam(new AmazonTypes.ListParameter('MarketplaceIdList.Id', _.map(options['MarketplaceIdList.Id'], function (item) {
                return AmazonTypes.MarketplaceId[item];
            })));
        }
        request.send(function (err, result) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, new AmazonTypes.RequestReportResult(result));
            }
        });
    };
    Reports.prototype.getReportRequestList = function (options, callback) {
        var request = new Request.Request(this.endpoint, this.credentials);
        request.addParam(new AmazonTypes.StringParameter('Action', 'GetReportRequestList'));
        request.addParam(new AmazonTypes.StringParameter('Merchant', this.credentials.sellerId));
        request.addParam(new AmazonTypes.StringParameter('Version', this.version));
        if (_.has(options, 'ReportRequestIdList.Id'))
            request.addParam(new AmazonTypes.ListParameter('ReportRequestIdList.Id', options['ReportRequestIdList.Id']));
        if (_.has(options, 'ReportTypeList.Type')) {
            request.addParam(new AmazonTypes.ListParameter('ReportTypeList.Type', _.map(options['ReportTypeList.Type'], function (item) {
                return AmazonTypes.ReportType[item];
            })));
        }
        if (_.has(options, 'ReportProcessingStatusList.Status')) {
            request.addParam(new AmazonTypes.ListParameter('ReportProcessingStatusList.Status', _.map(options['ReportProcessingStatusList.Status'], function (item) {
                return AmazonTypes.ReportProcessingStatus[item];
            })));
        }
        if (_.has(options, 'MaxCount'))
            request.addParam(new AmazonTypes.StringParameter('MaxCount', options.MaxCount.toString()));
        if (_.has(options, 'RequestedFromDate'))
            request.addParam(new AmazonTypes.TimestampParameter('RequestedFromDate', options.RequestedFromDate));
        if (_.has(options, 'RequestedToDate'))
            request.addParam(new AmazonTypes.TimestampParameter('RequestedToDate', options.RequestedToDate));
        request.send(function (err, result) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, new AmazonTypes.GetReportRequestListResult(result));
            }
        });
    };
    Reports.prototype.getReport = function (options, callback) {
        var request = new Request.Request(this.endpoint, this.credentials);
        request.addParam(new AmazonTypes.StringParameter('Action', 'GetReport'));
        request.addParam(new AmazonTypes.StringParameter('Merchant', this.credentials.sellerId));
        request.addParam(new AmazonTypes.StringParameter('Version', this.version));
        request.addParam(new AmazonTypes.StringParameter('ReportId', options.ReportId));
        request.send(function (err, result) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, result);
            }
        });
    };
    return Reports;
}());
exports.Reports = Reports;
//# sourceMappingURL=reports.js.map