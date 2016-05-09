import moment = require('moment');

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
        }

        public listOrders(options : ListOrdersRequest, callback : (err? : any, result? : any) => void) {
            
        }
    }
}

export = Amazon;