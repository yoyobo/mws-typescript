import AmazonTypes = require('./types');
export declare class Orders {
    private credentials;
    private endpoint;
    private version;
    constructor(credentials: AmazonTypes.Credentials);
    listOrders(options: AmazonTypes.ListOrdersRequest, callback: (err?: AmazonTypes.Error, result?: AmazonTypes.ListOrdersResult) => void): void;
    listOrderItems(options: AmazonTypes.ListOrderItemsRequest, callback: (err?: AmazonTypes.Error, result?: AmazonTypes.ListOrderItemsResult) => void): void;
}
