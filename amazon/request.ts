import _ = require('underscore');
import moment = require('moment');
import request = require('request');
var xmlParse = require('xml2js').parseString;
import crypto = require('crypto');

import AmazonTypes = require('./types');

export class Request {
    private parameters: AmazonTypes.Parameter[];

    constructor(private endpoint: string, private credentials: AmazonTypes.Credentials) {
        this.parameters = [];
        this.addParam(new AmazonTypes.StringParameter('AWSAccessKeyId', this.credentials.awsAccountId));
        this.addParam(new AmazonTypes.StringParameter('SignatureMethod', 'HmacSHA256'));
        this.addParam(new AmazonTypes.StringParameter('SignatureVersion', '2'));
        this.addParam(new AmazonTypes.TimestampParameter('Timestamp', moment()));
    }

    public addParam(param: AmazonTypes.Parameter) {
        this.parameters.push(param);
    }

    public send(callback: AmazonTypes.ResultCallback) {
        var signature: string = this.getSignature();
        this.addParam(new AmazonTypes.StringParameter('Signature', signature));

        var userAgent: string = 'pptest/1.0 (Language=Javascript)';
        var contentType: string = 'text/xml';

        var queryString: string = this.getQueryString();

        console.log('queryString', queryString);

        request.post('https://' + this.credentials.host + this.endpoint + '?' + queryString, {
            headers: {
                'x-amazon-user-agent': userAgent,
                'Content-Type': contentType
            }
        }, function(err, httpResponse, body) {
            if (err)
                callback({ origin: 'PostRequest', message: err, metadata: httpResponse });
            else {
                // Detect non xml content and return without parsing
                if (_.has(httpResponse.headers, 'content-type') && httpResponse.headers['content-type'] == 'text/plain;charset=Cp1252') {
                    callback(null, body);
                }
                else {
                    // Expect content to be xml (content-type is not specified in every case)
                    xmlParse(body, { explicitArray: false }, function(err, result) {
                        if (err) {
                            callback({ origin: 'XMLParsing', message: err });
                        } else if (_.has(result, 'ErrorResponse')) {
                            callback({ origin: 'MWS', message: result['ErrorResponse']['Error']['Message'], metadata: result['ErrorResponse']['Error'] });
                        } else {
                            callback(null, result);
                        }
                    });
                }
            }
        });
    }

    private getSignature(): string {
        let strToSign: string = this.getStringToSign(this.endpoint);
        let hmac: string = crypto.createHmac('sha256', this.credentials.secretKey).update(strToSign).digest('hex');

        let b64hmac: string = this.hexStrToBase64(hmac);

        //padding to string length multiple of 4
        var j = b64hmac.length % 4;
        for (var i = 0; i < j; i++) {
            b64hmac += '=';
        }

        return b64hmac;
    }

    private getQueryString(): string {
        var input: AmazonTypes.Dictionary<string> = {};

        _.each(this.parameters, function(param: AmazonTypes.Parameter) {
            var serialized: AmazonTypes.Dictionary<string> = param.serialize();
            _.extend(input, serialized);
        });

        var queryArray = [];
        _.each(input, (value, key) => {
            queryArray.push(key + '=' + this.urlEncode(value));
        });

        return queryArray.join('&');
    }

    private getStringToSign(endpoint: string): string {
        var input = {};

        _.each(this.parameters, function(param: AmazonTypes.Parameter) {
            var serialized: AmazonTypes.Dictionary<string> = param.serialize();
            _.extend(input, serialized);
        });

        var keys = _.keys(input).sort();

        var str = '';
        for (var i = 0; i < keys.length; i++) {
            if (i != 0) {
                str += '&';
            }

            str += keys[i] + '=' + this.urlEncode(input[keys[i]]);
        }

        return ['POST', this.credentials.host, endpoint, str].join('\n');
    }

    private urlEncode(input: string): string {
        input = encodeURIComponent(input);
        input = input.replace(/\*/g, '%2A');
        input = input.replace(/\(/g, '%28');
        input = input.replace(/\)/g, '%29');
        input = input.replace(/'/g, '%27');
        input = input.replace(/!/g, '%21');
        return input;
    }

    private hexStrToBase64(input: string): string {
        let b64pad = '=';

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
                if ((i / 2) * 8 + j * 6 > (input.length / 2) * 8) output += b64pad;
                else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
            }
        }

        return output;
    }
}
