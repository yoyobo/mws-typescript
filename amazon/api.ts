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

    export function urlEncode(input : string) : string {
        input = encodeURIComponent(input);
        input = input.replace(/\*/g, '%2A');
        input = input.replace(/\(/g, '%28');
        input = input.replace(/\)/g, '%29');
        input = input.replace(/'/g, '%27');
        input = input.replace(/!/g, '%21');
        return input;
    }

    export class MWS {
        private endpoint : string;
        private sellerId : string;
        private awsAccountId : string;
        private secretKey : string;

        constructor() {
            this.sellerId = process.env.AMAZON_MERCHANT_ID;
            this.awsAccountId = process.env.AMAZON_ACCESS_KEY_ID;
            this.secretKey = process.env.AMAZON_SECRET_ACCESS_KEY;

            this.endpoint = '/Orders/2013-09-01'
        }

        private getStringToSign(input : {[key : string] : string}) : string {
            var keys = [];
            for(var k in input) keys.push(k);
            var str = '';

            keys = keys.sort();

            for(var i=0;i<keys.length;i++) {
                if(i != 0) str += '&';
                str += keys[i] + '=' + input[keys[i]];
            }

            return 'POST\n' +
                'mws.amazonservices.de\n' +
                this.endpoint + '\n' +
                str;
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

        public createSignature(input : {[key : string] : string}, secret : string) : string {
            let strToSign : string = this.getStringToSign(input);
            let hmac : string = crypto.createHmac('sha256', secret).update(strToSign).digest('hex');

            let b64hmac : string = this.hexStrToBase64(hmac);

            //padding to string length multiple of 4
            var j = b64hmac.length % 4;
            for (var i = 0; i < j; i++) {
                b64hmac += '=';
            }

            return b64hmac;
        }

        public listOrders(options : ListOrdersRequest, callback : (err? : any, result? : any) => void) {
            var parameters : {[key : string] : string} = {};
            // parameters to be signed
            parameters['Action'] = 'ListOrders';
            parameters['SellerId'] = urlEncode(this.sellerId);
            parameters['CreatedAfter'] = urlEncode(options.CreatedAfter.toISOString());
            var count = 0;
            _.each(options['MarketplaceId.Id'], (id : string) => {
                parameters['MarketplaceId.Id.' + ++count] = urlEncode(id);
            });
            parameters['AWSAccessKeyId'] = this.awsAccountId;
            parameters['SignatureMethod'] = 'HmacSHA256';
            parameters['SignatureVersion'] = '2';

            parameters['Timestamp'] = urlEncode(moment().toISOString());
            parameters['Version'] = '2013-09-01';

            // signature
            parameters['Signature'] = urlEncode(this.createSignature(parameters, this.secretKey));

            var userAgent : string = 'pptest/1.0 (Language=Javascript)';
            var contentType : string = 'text/xml';

            var queryString : string = _.map(parameters, function(value, key) {
                return key + '=' + value;
            }).join('&');

            console.log('queryString', queryString);

            request.post('https://mws.amazonservices.de' + this.endpoint + '?' + queryString, {
                headers : {
                    'x-amazon-user-agent' : userAgent,
                    'Content-Type' : contentType
                }
            }, callback);
        }
    }
}

export = Amazon;