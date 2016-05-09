import _ = require('underscore');
import moment = require('moment');
import crypto = require('crypto');
import request = require('request');

module Amazon {
    export interface ListOrdersRequest {
        CreatedAfter : moment.Moment;
        CreatedBefore? : string;
        LastUpdatedAfter? : string;
        LastUpdatedBefore? : string;
        'MarketplaceId.Id' : string[];
        'OrderStatus.Status'? : string[];
        'FulfillmentChannel.Channel'? : string[];
        SellerOrderId? : string;
        BuyerEmail?: string;
        'PaymentMethod.Method'? : string[];
        'TFMShipmentStatus.Status'? : string[];
        MaxResultsPerPage? : number;
    }

    export interface Credentials {
        sellerId : string;
        awsAccountId : string;
        secretKey : string;
        host : string;
    }

    export interface Dictionary<T> {
        [key : string] : T
    }

    export interface Parameter {
        serialize() : Dictionary<string>;
    }

    export class StringParameter implements Parameter {
        constructor(private key : string, private value : string) {
        }

        serialize() : Dictionary<string> {
            var result : Dictionary<string> = {};
            result[this.key] = this.value;
            return result;
        }
    }

    export class TimestampParameter implements Parameter {
        constructor(private key : string, private value : moment.Moment) {
        }

        serialize() : Dictionary<string> {
            var result : Dictionary<string> = {};
            result[this.key] = this.value.toISOString();
            return result;
        }
    }

    export class ListParameter implements Parameter {
        private values : string[];
        constructor(private key : string, values? : string[]) {
            this.values = values || [];
        }

        public push(value : string) {
            this.values.push(value);
        }

        public serialize() : Dictionary<string> {
            var result : Dictionary<string> = {};

            var count = 0;
            _.each(this.values, (value : string) => {
                result[this.key + '.' + ++count] = value;
            });

            return result;
        }
    }

    export interface ResultCallback {
        (err? : any, result? : any) : void;
    }

    export class Request {
        private parameters : Parameter[];

        constructor(private endpoint : string, private credentials : Credentials) {
            this.parameters = [];
            this.addParam(new StringParameter('AWSAccessKeyId', this.credentials.awsAccountId));
            this.addParam(new StringParameter('SignatureMethod', 'HmacSHA256'));
            this.addParam(new StringParameter('SignatureVersion', '2'));
            this.addParam(new TimestampParameter('Timestamp', moment()));
        }

        public addParam(param : Parameter) {
            this.parameters.push(param);
        }

        public send(callback : ResultCallback) {
            var signature : string = this.getSignature();
            this.addParam(new StringParameter('Signature', signature));

            var userAgent : string = 'pptest/1.0 (Language=Javascript)';
            var contentType : string = 'text/xml';

            var queryString : string = this.getQueryString();

            console.log('queryString', queryString);

            request.post('https://' + this.credentials.host + this.endpoint + '?' + queryString, {
                headers : {
                    'x-amazon-user-agent' : userAgent,
                    'Content-Type' : contentType
                }
            }, callback);
        }

        private getSignature() : string {
            let strToSign : string = this.getStringToSign(this.endpoint);
            let hmac : string = crypto.createHmac('sha256', this.credentials.secretKey).update(strToSign).digest('hex');

            let b64hmac : string = this.hexStrToBase64(hmac);

            //padding to string length multiple of 4
            var j = b64hmac.length % 4;
            for (var i = 0; i < j; i++) {
                b64hmac += '=';
            }

            return b64hmac;
        }

        private getQueryString() : string {
            var input : Dictionary<string>= {};

            _.each(this.parameters, function(param : Parameter) {
                var serialized : Dictionary<string> = param.serialize();
                _.extend(input, serialized);
            });

            var queryArray = [];
            _.each(input, (value, key) => {
                queryArray.push(key + '=' + this.urlEncode(value));
            });

            return queryArray.join('&');
        }

        private getStringToSign(endpoint : string) : string {
            var input = {};

            _.each(this.parameters, function(param : Parameter) {
                var serialized : Dictionary<string> = param.serialize();
                _.extend(input, serialized);
            });

            var keys = _.keys(input).sort();

            var str = '';
            for(var i = 0; i < keys.length; i++) {
                if (i != 0) {
                    str += '&';
                }

                str += keys[i] + '=' + this.urlEncode(input[keys[i]]);
            }

            return ['POST', this.credentials.host, endpoint, str].join('\n');
        }

        private urlEncode(input : string) : string {
            input = encodeURIComponent(input);
            input = input.replace(/\*/g, '%2A');
            input = input.replace(/\(/g, '%28');
            input = input.replace(/\)/g, '%29');
            input = input.replace(/'/g, '%27');
            input = input.replace(/!/g, '%21');
            return input;
        }

        private hexStrToBase64(input:string):string {
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

    export class MWS {
        public credentials : Credentials;
        constructor() {
            this.credentials = {
                sellerId : process.env.AMAZON_MERCHANT_ID,
                awsAccountId : process.env.AMAZON_ACCESS_KEY_ID,
                secretKey : process.env.AMAZON_SECRET_ACCESS_KEY,
                host : 'mws.amazonservices.de'
            };

            this.Orders = new Orders(this)
        }

        public Orders : Orders;
    }

    export class Orders {
        private endpoint : string = '/Orders/2013-09-01';
        private version : string = '2013-09-01';

        constructor(private mws : MWS) {

        }

        public listOrders(options : ListOrdersRequest, callback : (err? : any, result? : any) => void) {
            var request : Request = new Request(this.endpoint, this.mws.credentials);

            request.addParam(new StringParameter('Action', 'ListOrders'));
            request.addParam(new StringParameter('SellerId', this.mws.credentials.sellerId));

            request.addParam(new TimestampParameter('CreatedAfter', options.CreatedAfter));
            request.addParam(new ListParameter('MarketplaceId.Id', options['MarketplaceId.Id']));
            request.addParam(new StringParameter('Version', this.version));

            request.send(callback);
        }
    }
}

export = Amazon;