import moment = require('moment');
declare module AmazonTypes {
    class List<T> {
        key: string;
    }
    interface Dictionary<T> {
        [key: string]: T;
    }
    interface Parameter {
        serialize(): Dictionary<string>;
    }
    interface Credentials {
        sellerId: string;
        awsAccountId: string;
        secretKey: string;
        host: string;
    }
    interface ListOrdersRequest {
        'MarketplaceId.Id': MarketplaceId[];
        CreatedAfter?: moment.Moment;
        CreatedBefore?: moment.Moment;
        LastUpdatedAfter?: moment.Moment;
        LastUpdatedBefore?: moment.Moment;
        'OrderStatus.Status'?: AmazonTypes.OrderStatus[];
        'FulfillmentChannel.Channel'?: AmazonTypes.FulfillmentChannel[];
        SellerOrderId?: string;
        BuyerEmail?: string;
        'PaymentMethod.Method'?: AmazonTypes.PaymentMethod[];
        'TFMShipmentStatus.Status'?: string[];
        MaxResultsPerPage?: number;
    }
    interface Order {
        AmazonOrderId: string;
        SellerOrderId?: string;
        PurchaseDate: moment.Moment;
        LastUpdateDate: moment.Moment;
        OrderStatus: OrderStatus;
        FulfillmentChannel?: FulfillmentChannel;
        SalesChannel?: string;
        OrderChannel?: string;
        ShipServiceLevel?: string;
        ShippingAddress?: Address;
        BillingAddress?: Address;
        OrderTotal?: Money;
        NumberOfItemsShipped?: number;
        NumberOfItemsUnshipped?: number;
        PaymentExecutionDetail?: any;
        PaymentMethod?: PaymentMethod;
        MarketplaceId: MarketplaceId;
        BuyerEmail?: string;
        BuyerName?: string;
        IsBusinessOrder?: boolean;
        PurchaseOrderNumber?: string;
        ShipmentServiceLevelCategory?: ShipmentServiceLevelCategory;
        ShippedByAmazonTFM?: boolean;
        TFMShipmentStatus?: string;
        CbaDisplayableShippingLabel?: string;
        OrderType: OrderType;
        EarliestShipDate?: moment.Moment;
        LatestShipDate?: moment.Moment;
        EarliestDeliveryDate?: moment.Moment;
        LatestDeliveryDate?: moment.Moment;
        IsPrime?: boolean;
        IsPremiumOrder?: boolean;
    }
    class ListOrdersResult {
        rawData: any;
        orderList: Order[];
        constructor(rawData: any);
    }
    interface ListOrderItemsRequest {
        AmazonOrderId: string;
    }
    interface OrderItem {
        ASIN: string;
        SellerSKU?: string;
        OrderItemId: string;
        Title?: string;
        QuantityOrdered: number;
        QuantityShipped?: number;
        PointsGranted?: any;
        ItemPrice?: Money;
        ShippingPrice?: Money;
        GiftWrapPrice?: Money;
        ItemTax?: Money;
        ShippingTax?: Money;
        GiftWrapTax?: Money;
        ShippingDiscount?: Money;
        PromotionDiscount?: Money;
        PromotionIds?: any;
        CODFee?: Money;
        CODFeeDiscount?: Money;
        GiftMessageText?: string;
        GiftWrapLevel?: string;
        InvoiceData?: any;
        ConditionNote?: string;
        ConditionId?: ConditionId;
        ConditionSubtypeId?: ConditionSubtypeId;
        ScheduledDeliveryStartDate?: moment.Moment;
        ScheduledDeliveryEndDate?: moment.Moment;
        PriceDesignation?: string;
    }
    class ListOrderItemsResult {
        rawData: any;
        orderItemList: OrderItem[];
        constructor(rawData: any);
    }
    class StringParameter implements AmazonTypes.Parameter {
        private key;
        private value;
        constructor(key: string, value: string);
        serialize(): AmazonTypes.Dictionary<string>;
    }
    class BooleanParameter implements AmazonTypes.Parameter {
        private key;
        private value;
        constructor(key: string, value: boolean);
        serialize(): AmazonTypes.Dictionary<string>;
    }
    class TimestampParameter implements AmazonTypes.Parameter {
        private key;
        private value;
        constructor(key: string, value: moment.Moment);
        serialize(): AmazonTypes.Dictionary<string>;
    }
    class ListParameter implements AmazonTypes.Parameter {
        private key;
        private values;
        constructor(key: string, values?: string[]);
        push(value: string): void;
        serialize(): AmazonTypes.Dictionary<string>;
    }
    interface ResultCallback {
        (err: AmazonTypes.Error, result?: any): void;
    }
    interface RequestReportRequest {
        ReportType: string;
        StartDate?: moment.Moment;
        EndDate?: moment.Moment;
        ReportOptions?: string;
        'MarketplaceIdList.Id'?: MarketplaceId[];
    }
    interface ReportRequestInfo {
        ReportRequestId: string;
        ReportType: ReportType;
        StartDate: moment.Moment;
        EndDate: moment.Moment;
        Scheduled: boolean;
        SubmittedDate: moment.Moment;
        ReportProcessingStatus: ReportProcessingStatus;
        GeneratedReportId?: string;
        StartedProcessingDate?: moment.Moment;
        CompletedDate?: moment.Moment;
    }
    class RequestReportResult {
        rawData: any;
        reportRequestInfo: ReportRequestInfo;
        constructor(rawData: any);
    }
    interface GetReportRequestListRequest {
        'ReportRequestIdList.Id'?: string[];
        'ReportTypeList.Type'?: AmazonTypes.ReportType[];
        'ReportProcessingStatusList.Status'?: AmazonTypes.ReportProcessingStatus[];
        MaxCount?: number;
        RequestedFromDate?: moment.Moment;
        RequestedToDate?: moment.Moment;
    }
    class GetReportRequestListResult {
        rawData: any;
        reportRequestInfoList: ReportRequestInfo[];
        constructor(rawData: any);
    }
    interface GetReportRequest {
        ReportId: string;
    }
    interface BodyData {
        data: string;
        'content-type': FeedContentType;
    }
    interface SubmitFeedRequest {
        FeedType: FeedType;
        'MarketplaceIdList.Id'?: MarketplaceId[];
        PurgeAndReplace?: boolean;
    }
    interface FeedSubmissionInfo {
        FeedSubmissionId: string;
        FeedType: FeedType;
        SubmittedDate: moment.Moment;
        FeedProcessingStatus: FeedProcessingStatus;
        StartedProcessingDate: moment.Moment;
        CompletedProcessingDate: moment.Moment;
    }
    class FeedSubmissionResult {
        rawData: any;
        feedSubmissionData: FeedSubmissionInfo;
        constructor(rawData: any);
    }
    class GetFeedSubmissionListResult {
        rawData: any;
        feedSubmissionList: FeedSubmissionInfo[];
        constructor(rawData: any);
    }
    interface GetFeedSubmissionListRequest {
        'FeedSubmissionIdList.Id'?: string[];
        MaxCount?: number;
        'FeedTypeList.Type'?: FeedType[];
        'FeedProcessingStatusList.Status'?: FeedProcessingStatus[];
        SubmittedFromDate?: moment.Moment;
        SubmittedToDate?: moment.Moment;
    }
    interface GetFeedSubmissionResultRequest {
        FeedSubmissionId: string;
    }
    enum FeedProcessingStatus {
        _AWAITING_ASYNCHRONOUS_REPLY_ = 0,
        _CANCELLED_ = 1,
        _DONE_ = 2,
        _IN_PROGRESS_ = 3,
        _IN_SAFETY_NET_ = 4,
        _SUBMITTED_ = 5,
        _UNCONFIRMED_ = 6,
    }
    enum FeedContentType {
        'text/tab-separated-values; charset=iso-8859-1' = 0,
        'text/xml' = 1,
    }
    enum FeedType {
        '_POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA_' = 0,
        '_POST_ORDER_FULFILLMENT_DATA_' = 1,
    }
    var MarketplaceIdDic: Dictionary<string>;
    enum ReportType {
        _GET_FLAT_FILE_OPEN_LISTINGS_DATA_ = 0,
        _GET_FLAT_FILE_ORDERS_DATA_ = 1,
        _GET_ORDERS_DATA_ = 2,
        _GET_CONVERGED_FLAT_FILE_ORDER_REPORT_DATA_ = 3,
    }
    enum ReportProcessingStatus {
        _SUBMITTED_ = 0,
        _IN_PROGRESS_ = 1,
        _CANCELLED_ = 2,
        _DONE_ = 3,
        _DONE_NO_DATA_ = 4,
    }
    enum ConditionId {
        New = 0,
        Used = 1,
        Collectible = 2,
        Refurbished = 3,
        Preorder = 4,
        Club = 5,
    }
    enum ConditionSubtypeId {
        New = 0,
        Mint = 1,
        'Very Good' = 2,
        Good = 3,
        Acceptable = 4,
        Poor = 5,
        Club = 6,
        OEM = 7,
        Warranty = 8,
        'Refurbished Warranty' = 9,
        Refurbished = 10,
        'Open Box' = 11,
        Any = 12,
        Other = 13,
    }
    enum OrderStatus {
        Pending = 0,
        Unshipped = 1,
        PartiallyShipped = 2,
        Shipped = 3,
    }
    enum FulfillmentChannel {
        AFN = 0,
        MFN = 1,
    }
    enum PaymentMethod {
        COD = 0,
        CVS = 1,
        Other = 2,
    }
    enum MarketplaceId {
        A1PA6795UKMFR9 = 0,
        A1RKKUPIHCS9HS = 1,
        A13V1IB3VIYZZH = 2,
        A21TJRUUN4KGV = 3,
        APJ6JRA9NG5V4 = 4,
        A1F83G8C2ARO7P = 5,
    }
    enum ShipmentServiceLevelCategory {
        Expedited = 0,
        FreeEconomy = 1,
        NextDay = 2,
        SameDay = 3,
        SecondDay = 4,
        Scheduled = 5,
        Standard = 6,
    }
    enum OrderType {
        StandardOrder = 0,
        Preorder = 1,
    }
    interface Address {
        Name: string;
        AddressLine1?: string;
        AddressLine2?: string;
        AddressLine3?: string;
        City: string;
        County: string;
        District: string;
        StateOrRegion: string;
        PostalCode: string;
        CountryCode: string;
        Phone: string;
    }
    interface Money {
        CurrencyCode: string;
        Amount: number;
    }
    interface Error {
        origin: string;
        message: string;
        metadata?: any;
    }
}
export = AmazonTypes;
