"use strict";
var _ = require('underscore');
var moment = require('moment');
var request = require('request');
var xmlParse = require('xml2js').parseString;
var crypto = require('crypto');
var utf8 = require('utf8');
var AmazonTypes = require('./types');
var Request = (function () {
    function Request(endpoint, credentials) {
        this.endpoint = endpoint;
        this.credentials = credentials;
        this.parameters = [];
        this.addParam(new AmazonTypes.StringParameter('AWSAccessKeyId', this.credentials.awsAccountId));
        this.addParam(new AmazonTypes.StringParameter('SignatureMethod', 'HmacSHA256'));
        this.addParam(new AmazonTypes.StringParameter('SignatureVersion', '2'));
        this.addParam(new AmazonTypes.TimestampParameter('Timestamp', moment()));
    }
    Request.prototype.addParam = function (param) {
        this.parameters.push(param);
    };
    Request.prototype.setBody = function (body) {
        this.body = body;
    };
    // send the request to amazon
    Request.prototype.send = function (callback) {
        var _this = this;
        var signature = this.getSignature();
        this.addParam(new AmazonTypes.StringParameter('Signature', signature));
        var userAgent = 'pptest/1.0 (Language=Javascript)';
        var contentType = this.body ? AmazonTypes.FeedContentType[this.body['content-type']] : 'text/xml';
        var queryString = this.getQueryString();
        console.log('queryString', queryString);
        var requestOptions = {
            headers: {
                'x-amazon-user-agent': userAgent,
                'Content-Type': contentType
            }
        };
        // Handle body data
        if (this.body) {
            requestOptions['body'] = this.body.data;
            requestOptions.headers['content-md5'] = this.hexStrToBase64(this.hex_md5(this.body.data));
        }
        request.post('https://' + this.credentials.host + this.endpoint + '?' + queryString, requestOptions, function (err, httpResponse, body) {
            if (err)
                callback({ origin: 'PostRequest', message: err, metadata: httpResponse });
            else {
                // Detect non xml content and return without parsing
                if (_.has(httpResponse.headers, 'content-type') && httpResponse.headers['content-type'].match(/^text\/plain/)) {
                    if (_.has(httpResponse.headers, 'content-md5')) {
                        var calcResMd5 = _this.hexStrToBase64(_this.hex_md5(body));
                        if (calcResMd5 !== httpResponse.headers['content-md5']) {
                            // Catch md5 mismatch error
                            callback({ origin: 'MD5-Comparison', message: 'MD5-Mismatch', metadata: { 'computedMd5FromResponse': calcResMd5, 'md5FromResponseHeader': httpResponse.headers['content-md5'] } });
                        }
                        else {
                            // Return raw result
                            callback(null, body);
                        }
                    }
                    else {
                        // Return raw result
                        callback(null, body);
                    }
                }
                else {
                    // Expect content to be xml (content-type is not specified in every case)
                    xmlParse(body, { explicitArray: false }, function (err, result) {
                        if (err) {
                            // Catch error at XML parsing
                            callback({ origin: 'XMLParsing', message: err });
                        }
                        else if (_.has(result, 'ErrorResponse')) {
                            // Catch error returned from API
                            callback({ origin: 'MWS', message: result['ErrorResponse']['Error']['Message'], metadata: result['ErrorResponse']['Error'] });
                        }
                        else {
                            // Return parsed result
                            callback(null, result);
                        }
                    });
                }
            }
        });
    };
    // Compute signature for set parameters
    Request.prototype.getSignature = function () {
        var strToSign = this.getStringToSign(this.endpoint);
        var hmac = crypto.createHmac('sha256', this.credentials.secretKey).update(strToSign).digest('hex');
        var b64hmac = this.hexStrToBase64(hmac);
        //padding to string length multiple of 4
        var j = b64hmac.length % 4;
        for (var i = 0; i < j; i++) {
            b64hmac += '=';
        }
        return b64hmac;
    };
    // Build http query string from parameters
    Request.prototype.getQueryString = function () {
        var _this = this;
        var input = {};
        _.each(this.parameters, function (param) {
            var serialized = param.serialize();
            _.extend(input, serialized);
        });
        var queryArray = [];
        _.each(input, function (value, key) {
            queryArray.push(key + '=' + _this.urlEncode(value));
        });
        return queryArray.join('&');
    };
    // Build string to be signed for API call
    Request.prototype.getStringToSign = function (endpoint) {
        var input = {};
        // Get all values from parameters
        _.each(this.parameters, function (param) {
            var serialized = param.serialize();
            _.extend(input, serialized);
        });
        // Sort list
        var keys = _.keys(input).sort();
        var str = '';
        for (var i = 0; i < keys.length; i++) {
            if (i != 0) {
                str += '&';
            }
            str += keys[i] + '=' + this.urlEncode(input[keys[i]]);
        }
        // Join output string
        return ['POST', this.credentials.host, endpoint, str].join('\n');
    };
    // Custom url encoding taken from scratchpad
    Request.prototype.urlEncode = function (input) {
        input = encodeURIComponent(input);
        input = input.replace(/\*/g, '%2A');
        input = input.replace(/\(/g, '%28');
        input = input.replace(/\)/g, '%29');
        input = input.replace(/'/g, '%27');
        input = input.replace(/!/g, '%21');
        return input;
    };
    // convert hex string to base64 encoded string (taken from scratchpad)
    Request.prototype.hexStrToBase64 = function (input) {
        var b64pad = '=';
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var hex = "0123456789abcdef";
        var output = "";
        var len = input.length;
        for (var i = 0; i < len; i += 6) {
            var c1 = hex.indexOf(input.charAt(i)) << 4;
            c1 += hex.indexOf(input.charAt(i + 1));
            var c2 = (i + 2) < len ? hex.indexOf(input.charAt(i + 2)) << 4 : 0;
            c2 += (i + 3) < len ? hex.indexOf(input.charAt(i + 3)) : 0;
            var c3 = (i + 4) < len ? hex.indexOf(input.charAt(i + 4)) << 4 : 0;
            c3 += (i + 5) < len ? hex.indexOf(input.charAt(i + 5)) : 0;
            var triplet = (c1 << 16)
                | c2 << 8
                | c3;
            for (var j = 0; j < 4; j++) {
                //if(i * 16 + j * 12 > input.length * 16) output += b64pad;
                if ((i / 2) * 8 + j * 6 > (input.length / 2) * 8)
                    output += b64pad;
                else
                    output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
            }
        }
        return output;
    };
    // Build hex enconded md5 string
    Request.prototype.hex_md5 = function (s) {
        var utf8String = utf8.encode(s);
        var md5Hash = crypto.createHash('md5');
        md5Hash.update(utf8String);
        return md5Hash.digest('hex');
    };
    return Request;
}());
exports.Request = Request;
//# sourceMappingURL=request.js.map