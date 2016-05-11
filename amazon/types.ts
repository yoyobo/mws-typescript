import _ = require('underscore');
import moment = require('moment');

module AmazonTypes {
    export class List<T> {
        key: string;
    }

    export class ListOrdersResult {
        public orderList: Order[];
        constructor(public rawData: any) {
            this.orderList = [];
            _.each(rawData['ListOrdersResponse']['ListOrdersResult']['Orders']['Order'], (value: any) => {
                var newOrder: Order = {
                    AmazonOrderId: value['AmazonOrderId'],
                    PurchaseDate: moment(value['PurchaseDate']),
                    LastUpdateDate: moment(value['LastUpdateDate']),
                    OrderStatus: OrderStatus['' + value['OrderStatus']],
                    MarketplaceId: MarketplaceId['' + value['MarketplaceId']],
                    OrderType: OrderType['' + value['OrderType']],
                };

                if (_.has(value, 'SellerOrderId'))
                    newOrder.SellerOrderId = value['SellerOrderId'];

                if (_.has(value, 'FulfillmentChannel'))
                    newOrder.FulfillmentChannel = FulfillmentChannel['' + value['FulfillmentChannel']];

                if (_.has(value, 'SalesChannel'))
                    newOrder.SalesChannel = value['SalesChannel'];

                if (_.has(value, 'OrderChannel'))
                    newOrder.OrderChannel = value['OrderChannel'];

                if (_.has(value, 'ShipServiceLevel'))
                    newOrder.ShipServiceLevel = value['ShipServiceLevel'];

                if (_.has(value, 'ShippingAddress')) {
                    var shipAddress: Address = {
                        Name: value['ShippingAddress']['Name'],
                        City: value['ShippingAddress']['City'],
                        County: value['ShippingAddress']['County'],
                        District: value['ShippingAddress']['District'],
                        StateOrRegion: value['ShippingAddress']['StateOrRegion'],
                        PostalCode: value['ShippingAddress']['PostalCode'],
                        CountryCode: value['ShippingAddress']['CountryCode'],
                        Phone: value['ShippingAddress']['Phone']
                    }

                    if (_.has(value['ShippingAddress'], 'AddressLine1'))
                        shipAddress.AddressLine1 = value['ShippingAddress']['AddressLine1'];
                    if (_.has(value['ShippingAddress'], 'AddressLine2'))
                        shipAddress.AddressLine1 = value['ShippingAddress']['AddressLine2'];
                    if (_.has(value['ShippingAddress'], 'AddressLine3'))
                        shipAddress.AddressLine1 = value['ShippingAddress']['AddressLine3'];

                    newOrder.ShippingAddress = shipAddress;
                }


                if (_.has(value, 'OrderTotal')) {
                    var orderTotal: Money = {
                        CurrencyCode: value['OrderTotal']['CurrencyCode'],
                        Amount: parseFloat(value['OrderTotal']['Amount'])
                    }
                    newOrder.OrderTotal = orderTotal;
                }

                if (_.has(value, 'NumberOfItemsShipped'))
                    newOrder.NumberOfItemsShipped = parseInt(value['NumberOfItemsShipped']);

                if (_.has(value, 'NumberOfItemsUnshipped'))
                    newOrder.NumberOfItemsUnshipped = parseInt(value['NumberOfItemsUnshipped']);

                if (_.has(value, 'PaymentExecutionDetail'))
                    newOrder.PaymentExecutionDetail = value['PaymentExecutionDetail'];

                if (_.has(value, 'PaymentMethod'))
                    newOrder.PaymentMethod = PaymentMethod['' + value['PaymentMethod']];

                if (_.has(value, 'BuyerEmail'))
                    newOrder.BuyerEmail = value['BuyerEmail'];

                if (_.has(value, 'BuyerName'))
                    newOrder.BuyerName = value['BuyerName'];

                if (_.has(value, 'IsBusinessOrder'))
                    newOrder.IsBusinessOrder = value['IsBusinessOrder'] === 'true';

                if (_.has(value, 'PurchaseOrderNumber'))
                    newOrder.PurchaseOrderNumber = value['PurchaseOrderNumber'];

                if (_.has(value, 'ShipmentServiceLevelCategory'))
                    newOrder.ShipmentServiceLevelCategory = ShipmentServiceLevelCategory['' + value['ShipmentServiceLevelCategory']];

                if (_.has(value, 'ShippedByAmazonTFM'))
                    newOrder.ShippedByAmazonTFM = value['ShippedByAmazonTFM'] === 'true';

                if (_.has(value, 'TFMShipmentStatus'))
                    newOrder.TFMShipmentStatus = value['TFMShipmentStatus'];

                if (_.has(value, 'CbaDisplayableShippingLabel'))
                    newOrder.CbaDisplayableShippingLabel = value['CbaDisplayableShippingLabel'];

                if (_.has(value, 'EarliestShipDate'))
                    newOrder.EarliestShipDate = moment(value['EarliestShipDate']);

                if (_.has(value, 'LatestShipDate'))
                    newOrder.LatestShipDate = moment(value['LatestShipDate']);

                if (_.has(value, 'EarliestDeliveryDate'))
                    newOrder.EarliestDeliveryDate = moment(value['EarliestDeliveryDate']);

                if (_.has(value, 'LatestDeliveryDate'))
                    newOrder.LatestDeliveryDate = moment(value['LatestDeliveryDate']);

                if (_.has(value, 'IsPrime'))
                    newOrder.IsPrime = value['IsPrime'] === 'true';

                if (_.has(value, 'IsPremiumOrder'))
                    newOrder.IsPremiumOrder = value['IsPremiumOrder'] === 'true';

                this.orderList.push(newOrder);
            });
        }
    }

    export interface Order {
        AmazonOrderId: string,
        SellerOrderId?: string,
        PurchaseDate: moment.Moment,
        LastUpdateDate: moment.Moment,
        OrderStatus: OrderStatus,
        FulfillmentChannel?: FulfillmentChannel,
        SalesChannel?: string,
        OrderChannel?: string,
        ShipServiceLevel?: string,
        ShippingAddress?: Address,
        BillingAddress?: Address,
        OrderTotal?: Money,
        NumberOfItemsShipped?: number,
        NumberOfItemsUnshipped?: number,
        PaymentExecutionDetail?: any,
        PaymentMethod?: PaymentMethod,
        MarketplaceId: MarketplaceId,
        BuyerEmail?: string,
        BuyerName?: string,
        IsBusinessOrder?: boolean
        PurchaseOrderNumber?: string,
        ShipmentServiceLevelCategory?: ShipmentServiceLevelCategory,
        ShippedByAmazonTFM?: boolean,
        TFMShipmentStatus?: string,
        CbaDisplayableShippingLabel?: string,
        OrderType: OrderType,
        EarliestShipDate?: moment.Moment
        LatestShipDate?: moment.Moment,
        EarliestDeliveryDate?: moment.Moment,
        LatestDeliveryDate?: moment.Moment,
        IsPrime?: boolean,
        IsPremiumOrder?: boolean,
    }


    export class ListOrderItemsResult {
        public orderItemList: OrderItem[];
        constructor(public rawData: any) {
            this.orderItemList = [];
            _.each(rawData['ListOrderItemsResponse']['ListOrderItemsResult']['OrderItems'], (value: any) => {
                var newOrderItem: OrderItem = {
                    ASIN: value['ASIN'],
                    OrderItemId: value['OrderItemId'],
                    QuantityOrdered: parseInt(value['QuantityOrdered']),
                };

                if (_.has(value, 'SellerSKU'))
                    newOrderItem.SellerSKU = value['SellerSKU'];

                if (_.has(value, 'Title'))
                    newOrderItem.Title = value['Title'];

                if (_.has(value, 'QuantityShipped'))
                    newOrderItem.QuantityShipped = parseInt(value['QuantityShipped']);

                if (_.has(value, 'PointsGranted'))
                    newOrderItem.PointsGranted = value['PointsGranted'];

                if (_.has(value, 'ItemPrice')) {
                    var ItemPrice: Money = {
                        CurrencyCode: value['ItemPrice']['CurrencyCode'],
                        Amount: parseFloat(value['ItemPrice']['Amount'])
                    }
                    newOrderItem.ItemPrice = ItemPrice;
                }

                if (_.has(value, 'ShippingPrice')) {
                    var ShippingPrice: Money = {
                        CurrencyCode: value['ShippingPrice']['CurrencyCode'],
                        Amount: parseFloat(value['ShippingPrice']['Amount'])
                    }
                    newOrderItem.ShippingPrice = ShippingPrice;
                }

                if (_.has(value, 'GiftWrapPrice')) {
                    var GiftWrapPrice: Money = {
                        CurrencyCode: value['GiftWrapPrice']['CurrencyCode'],
                        Amount: parseFloat(value['GiftWrapPrice']['Amount'])
                    }
                    newOrderItem.GiftWrapPrice = GiftWrapPrice;
                }

                if (_.has(value, 'ItemTax')) {
                    var ItemTax: Money = {
                        CurrencyCode: value['ItemTax']['CurrencyCode'],
                        Amount: parseFloat(value['ItemTax']['Amount'])
                    }
                    newOrderItem.ItemTax = ItemTax;
                }

                if (_.has(value, 'ShippingTax')) {
                    var ShippingTax: Money = {
                        CurrencyCode: value['ShippingTax']['CurrencyCode'],
                        Amount: parseFloat(value['ShippingTax']['Amount'])
                    }
                    newOrderItem.ShippingTax = ShippingTax;
                }

                if (_.has(value, 'GiftWrapTax')) {
                    var GiftWrapTax: Money = {
                        CurrencyCode: value['GiftWrapTax']['CurrencyCode'],
                        Amount: parseFloat(value['GiftWrapTax']['Amount'])
                    }
                    newOrderItem.GiftWrapTax = GiftWrapTax;
                }

                if (_.has(value, 'ShippingDiscount')) {
                    var ShippingDiscount: Money = {
                        CurrencyCode: value['ShippingDiscount']['CurrencyCode'],
                        Amount: parseFloat(value['ShippingDiscount']['Amount'])
                    }
                    newOrderItem.ShippingDiscount = ShippingDiscount;
                }

                if (_.has(value, 'PromotionDiscount')) {
                    var PromotionDiscount: Money = {
                        CurrencyCode: value['PromotionDiscount']['CurrencyCode'],
                        Amount: parseFloat(value['PromotionDiscount']['Amount'])
                    }
                    newOrderItem.PromotionDiscount = PromotionDiscount;
                }

                if (_.has(value, 'PromotionIds'))
                    newOrderItem.PromotionIds = value['PromotionIds'];

                if (_.has(value, 'CODFee')) {
                    var CODFee: Money = {
                        CurrencyCode: value['CODFee']['CurrencyCode'],
                        Amount: parseFloat(value['CODFee']['Amount'])
                    }
                    newOrderItem.CODFee = CODFee;
                }

                if (_.has(value, 'CODFeeDiscount')) {
                    var CODFeeDiscount: Money = {
                        CurrencyCode: value['CODFeeDiscount']['CurrencyCode'],
                        Amount: parseFloat(value['CODFeeDiscount']['Amount'])
                    }
                    newOrderItem.CODFeeDiscount = CODFeeDiscount;
                }

                if (_.has(value, 'GiftMessageText'))
                    newOrderItem.GiftMessageText = value['GiftMessageText'];

                if (_.has(value, 'GiftWrapLevel'))
                    newOrderItem.GiftWrapLevel = value['GiftWrapLevel'];

                if (_.has(value, 'ConditionNote'))
                    newOrderItem.ConditionNote = value['ConditionNote'];

                if (_.has(value, 'ConditionId'))
                    newOrderItem.ConditionId = ConditionId['' + value['ConditionId']];

                if (_.has(value, 'ConditionSubtypeId'))
                    newOrderItem.ConditionSubtypeId = ConditionSubtypeId['' + value['ConditionSubtypeId']];

                if (_.has(value, 'ScheduledDeliveryStartDate'))
                    newOrderItem.ScheduledDeliveryStartDate = moment(value['ScheduledDeliveryStartDate']);

                if (_.has(value, 'ScheduledDeliveryEndDate'))
                    newOrderItem.ScheduledDeliveryEndDate = moment(value['ScheduledDeliveryEndDate']);

                if (_.has(value, 'PriceDesignation'))
                    newOrderItem.PriceDesignation = value['PriceDesignation'];

                this.orderItemList.push(newOrderItem);
            });
        }
    }

    export interface OrderItem {
        ASIN: string,
        SellerSKU?: string,
        OrderItemId: string,
        Title?: string,
        QuantityOrdered: number,
        QuantityShipped?: number,
        PointsGranted?: any,
        ItemPrice?: Money,
        ShippingPrice?: Money,
        GiftWrapPrice?: Money,
        ItemTax?: Money,
        ShippingTax?: Money,
        GiftWrapTax?: Money,
        ShippingDiscount?: Money,
        PromotionDiscount?: Money,
        PromotionIds?: any,
        CODFee?: Money,
        CODFeeDiscount?: Money,
        GiftMessageText?: string,
        GiftWrapLevel?: string,
        InvoiceData?: any,
        ConditionNote?: string,
        ConditionId?: ConditionId,
        ConditionSubtypeId?: ConditionSubtypeId,
        ScheduledDeliveryStartDate?: moment.Moment,
        ScheduledDeliveryEndDate?: moment.Moment,
        PriceDesignation?: string
    }

    export class RequestReportResult {
        public reportRequestInfo: ReportRequestInfo;
        constructor(public rawData: any) {
            var resultNode = rawData['RequestReportResponse']['RequestReportResult']['ReportRequestInfo'];
            this.reportRequestInfo = {
                ReportRequestId: resultNode['ReportRequestId'],
                ReportType: resultNode['ReportType'],
                StartDate: moment(resultNode['StartDate']),
                EndDate: moment(resultNode['EndDate']),
                Scheduled: resultNode['Scheduled'] === 'true',
                SubmittedDate: moment(resultNode['SubmittedDate']),
                ReportProcessingStatus: resultNode['ReportProcessingStatus'],
            }

            if (_.has(resultNode, 'GeneratedReportId'))
                this.reportRequestInfo['GeneratedReportId'] = resultNode['GeneratedReportId'];

            if (_.has(resultNode, 'StartedProcessingDate'))
                this.reportRequestInfo['StartedProcessingDate'] = moment(resultNode['StartedProcessingDate']);

            if (_.has(resultNode, 'CompletedDate'))
                this.reportRequestInfo['CompletedDate'] = moment(resultNode['CompletedDate']);
        }
    }

    export interface ReportRequestInfo {
        ReportRequestId: string,
        ReportType: string,
        StartDate: moment.Moment,
        EndDate: moment.Moment,
        Scheduled: boolean,
        SubmittedDate: moment.Moment,
        ReportProcessingStatus: string,
        GeneratedReportId?: string,
        StartedProcessingDate?: moment.Moment,
        CompletedDate?: moment.Moment
    }

    export enum ConditionId { New, Used, Collectible, Refurbished, Preorder, Club };
    export enum ConditionSubtypeId { New, Mint, 'Very Good', Good, Acceptable, Poor, Club, OEM, Warranty, 'Refurbished Warranty', Refurbished, 'Open Box', Any, Other }
    export enum OrderStatus { 'Pending', 'Unshipped', 'PartiallyShipped', 'Shipped' };

    export enum FulfillmentChannel { AFN, MFN };

    export enum PaymentMethod { COD, CVS, Other };

    export enum MarketplaceId { A1PA6795UKMFR9, A1RKKUPIHCS9HS, A13V1IB3VIYZZH, A21TJRUUN4KGV, APJ6JRA9NG5V4, A1F83G8C2ARO7P }

    export interface Dictionary<T> {
        [key: string]: T
    }

    export var MarketplaceIdDic: Dictionary<string> = {
        'A1PA6795UKMFR9': 'DE',
        'A1RKKUPIHCS9HS': 'ES',
        'A13V1IB3VIYZZH': 'FR',
        'A21TJRUUN4KGV': 'IN',
        'APJ6JRA9NG5V4': 'IT',
        'A1F83G8C2ARO7P': 'UK'
    };

    export enum ShipmentServiceLevelCategory { Expedited, FreeEconomy, NextDay, SameDay, SecondDay, Scheduled, Standard };

    export enum OrderType { StandardOrder, Preorder };

    export interface Address {
        Name: string,
        AddressLine1?: string,
        AddressLine2?: string,
        AddressLine3?: string,
        City: string,
        County: string,
        District: string,
        StateOrRegion: string,
        PostalCode: string,
        CountryCode: string,
        Phone: string
    };

    export interface Money {
        CurrencyCode: string,
        Amount: number
    };



    export interface Error {
        origin: string;
        message: string;
        metadata?: any;
    }
}



export = AmazonTypes;
