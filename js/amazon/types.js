"use strict";
var _ = require('underscore');
var moment = require('moment');
var AmazonTypes;
(function (AmazonTypes) {
    var List = (function () {
        function List() {
        }
        return List;
    }());
    AmazonTypes.List = List;
    var ListOrdersResult = (function () {
        function ListOrdersResult(rawData) {
            var _this = this;
            this.rawData = rawData;
            this.orderList = [];
            _.each(rawData['ListOrdersResponse']['ListOrdersResult']['Orders']['Order'], function (value) {
                var newOrder = {
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
                    var shipAddress = {
                        Name: value['ShippingAddress']['Name'],
                        City: value['ShippingAddress']['City'],
                        County: value['ShippingAddress']['County'],
                        District: value['ShippingAddress']['District'],
                        StateOrRegion: value['ShippingAddress']['StateOrRegion'],
                        PostalCode: value['ShippingAddress']['PostalCode'],
                        CountryCode: value['ShippingAddress']['CountryCode'],
                        Phone: value['ShippingAddress']['Phone']
                    };
                    if (_.has(value['ShippingAddress'], 'AddressLine1'))
                        shipAddress.AddressLine1 = value['ShippingAddress']['AddressLine1'];
                    if (_.has(value['ShippingAddress'], 'AddressLine2'))
                        shipAddress.AddressLine1 = value['ShippingAddress']['AddressLine2'];
                    if (_.has(value['ShippingAddress'], 'AddressLine3'))
                        shipAddress.AddressLine1 = value['ShippingAddress']['AddressLine3'];
                    newOrder.ShippingAddress = shipAddress;
                }
                if (_.has(value, 'OrderTotal')) {
                    var orderTotal = {
                        CurrencyCode: value['OrderTotal']['CurrencyCode'],
                        Amount: parseFloat(value['OrderTotal']['Amount'])
                    };
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
                _this.orderList.push(newOrder);
            });
        }
        return ListOrdersResult;
    }());
    AmazonTypes.ListOrdersResult = ListOrdersResult;
    var ListOrderItemsResult = (function () {
        function ListOrderItemsResult(rawData) {
            var _this = this;
            this.rawData = rawData;
            this.orderItemList = [];
            _.each(rawData['ListOrderItemsResponse']['ListOrderItemsResult']['OrderItems'], function (value) {
                var newOrderItem = {
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
                    var ItemPrice = {
                        CurrencyCode: value['ItemPrice']['CurrencyCode'],
                        Amount: parseFloat(value['ItemPrice']['Amount'])
                    };
                    newOrderItem.ItemPrice = ItemPrice;
                }
                if (_.has(value, 'ShippingPrice')) {
                    var ShippingPrice = {
                        CurrencyCode: value['ShippingPrice']['CurrencyCode'],
                        Amount: parseFloat(value['ShippingPrice']['Amount'])
                    };
                    newOrderItem.ShippingPrice = ShippingPrice;
                }
                if (_.has(value, 'GiftWrapPrice')) {
                    var GiftWrapPrice = {
                        CurrencyCode: value['GiftWrapPrice']['CurrencyCode'],
                        Amount: parseFloat(value['GiftWrapPrice']['Amount'])
                    };
                    newOrderItem.GiftWrapPrice = GiftWrapPrice;
                }
                if (_.has(value, 'ItemTax')) {
                    var ItemTax = {
                        CurrencyCode: value['ItemTax']['CurrencyCode'],
                        Amount: parseFloat(value['ItemTax']['Amount'])
                    };
                    newOrderItem.ItemTax = ItemTax;
                }
                if (_.has(value, 'ShippingTax')) {
                    var ShippingTax = {
                        CurrencyCode: value['ShippingTax']['CurrencyCode'],
                        Amount: parseFloat(value['ShippingTax']['Amount'])
                    };
                    newOrderItem.ShippingTax = ShippingTax;
                }
                if (_.has(value, 'GiftWrapTax')) {
                    var GiftWrapTax = {
                        CurrencyCode: value['GiftWrapTax']['CurrencyCode'],
                        Amount: parseFloat(value['GiftWrapTax']['Amount'])
                    };
                    newOrderItem.GiftWrapTax = GiftWrapTax;
                }
                if (_.has(value, 'ShippingDiscount')) {
                    var ShippingDiscount = {
                        CurrencyCode: value['ShippingDiscount']['CurrencyCode'],
                        Amount: parseFloat(value['ShippingDiscount']['Amount'])
                    };
                    newOrderItem.ShippingDiscount = ShippingDiscount;
                }
                if (_.has(value, 'PromotionDiscount')) {
                    var PromotionDiscount = {
                        CurrencyCode: value['PromotionDiscount']['CurrencyCode'],
                        Amount: parseFloat(value['PromotionDiscount']['Amount'])
                    };
                    newOrderItem.PromotionDiscount = PromotionDiscount;
                }
                if (_.has(value, 'PromotionIds'))
                    newOrderItem.PromotionIds = value['PromotionIds'];
                if (_.has(value, 'CODFee')) {
                    var CODFee = {
                        CurrencyCode: value['CODFee']['CurrencyCode'],
                        Amount: parseFloat(value['CODFee']['Amount'])
                    };
                    newOrderItem.CODFee = CODFee;
                }
                if (_.has(value, 'CODFeeDiscount')) {
                    var CODFeeDiscount = {
                        CurrencyCode: value['CODFeeDiscount']['CurrencyCode'],
                        Amount: parseFloat(value['CODFeeDiscount']['Amount'])
                    };
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
                _this.orderItemList.push(newOrderItem);
            });
        }
        return ListOrderItemsResult;
    }());
    AmazonTypes.ListOrderItemsResult = ListOrderItemsResult;
    var StringParameter = (function () {
        function StringParameter(key, value) {
            this.key = key;
            this.value = value;
        }
        StringParameter.prototype.serialize = function () {
            var result = {};
            result[this.key] = this.value;
            return result;
        };
        return StringParameter;
    }());
    AmazonTypes.StringParameter = StringParameter;
    var BooleanParameter = (function () {
        function BooleanParameter(key, value) {
            this.key = key;
            this.value = value;
        }
        BooleanParameter.prototype.serialize = function () {
            var result = {};
            result[this.key] = this.value.toString();
            return result;
        };
        return BooleanParameter;
    }());
    AmazonTypes.BooleanParameter = BooleanParameter;
    var TimestampParameter = (function () {
        function TimestampParameter(key, value) {
            this.key = key;
            this.value = value;
        }
        TimestampParameter.prototype.serialize = function () {
            var result = {};
            result[this.key] = this.value.toISOString();
            return result;
        };
        return TimestampParameter;
    }());
    AmazonTypes.TimestampParameter = TimestampParameter;
    var ListParameter = (function () {
        function ListParameter(key, values) {
            this.key = key;
            this.values = values || [];
        }
        ListParameter.prototype.push = function (value) {
            this.values.push(value);
        };
        ListParameter.prototype.serialize = function () {
            var _this = this;
            var result = {};
            var count = 0;
            _.each(this.values, function (value) {
                result[_this.key + '.' + ++count] = value;
            });
            return result;
        };
        return ListParameter;
    }());
    AmazonTypes.ListParameter = ListParameter;
    var RequestReportResult = (function () {
        function RequestReportResult(rawData) {
            this.rawData = rawData;
            var resultNode = rawData['RequestReportResponse']['RequestReportResult']['ReportRequestInfo'];
            this.reportRequestInfo = {
                ReportRequestId: resultNode['ReportRequestId'],
                ReportType: ReportType['' + resultNode['ReportType']],
                StartDate: moment(resultNode['StartDate']),
                EndDate: moment(resultNode['EndDate']),
                Scheduled: resultNode['Scheduled'] === 'true',
                SubmittedDate: moment(resultNode['SubmittedDate']),
                ReportProcessingStatus: ReportProcessingStatus['' + resultNode['ReportProcessingStatus']],
            };
            if (_.has(resultNode, 'GeneratedReportId'))
                this.reportRequestInfo['GeneratedReportId'] = resultNode['GeneratedReportId'];
            if (_.has(resultNode, 'StartedProcessingDate'))
                this.reportRequestInfo['StartedProcessingDate'] = moment(resultNode['StartedProcessingDate']);
            if (_.has(resultNode, 'CompletedDate'))
                this.reportRequestInfo['CompletedDate'] = moment(resultNode['CompletedDate']);
        }
        return RequestReportResult;
    }());
    AmazonTypes.RequestReportResult = RequestReportResult;
    var GetReportRequestListResult = (function () {
        function GetReportRequestListResult(rawData) {
            var _this = this;
            this.rawData = rawData;
            this.reportRequestInfoList = [];
            _.each(rawData['GetReportRequestListResponse']['GetReportRequestListResult']['ReportRequestInfo'], function (item) {
                var newReportRequestInfo = {
                    ReportRequestId: item['ReportRequestId'],
                    ReportType: ReportType['' + item['ReportType']],
                    StartDate: moment(item['StartDate']),
                    EndDate: moment(item['EndDate']),
                    Scheduled: item['Scheduled'] === 'true',
                    SubmittedDate: moment(item['SubmittedDate']),
                    ReportProcessingStatus: ReportProcessingStatus['' + item['ReportProcessingStatus']],
                };
                if (_.has(item, 'GeneratedReportId'))
                    newReportRequestInfo['GeneratedReportId'] = item['GeneratedReportId'];
                if (_.has(item, 'StartedProcessingDate'))
                    newReportRequestInfo['StartedProcessingDate'] = moment(item['StartedProcessingDate']);
                if (_.has(item, 'CompletedDate'))
                    newReportRequestInfo['CompletedDate'] = moment(item['CompletedDate']);
                _this.reportRequestInfoList.push(newReportRequestInfo);
            });
        }
        return GetReportRequestListResult;
    }());
    AmazonTypes.GetReportRequestListResult = GetReportRequestListResult;
    var FeedSubmissionResult = (function () {
        function FeedSubmissionResult(rawData) {
            this.rawData = rawData;
            var resultNode = rawData['SubmitFeedResponse']['SubmitFeedResult']['FeedSubmissionInfo'];
            this.feedSubmissionData = {
                FeedSubmissionId: resultNode['FeedSubmissionId'],
                FeedType: FeedType['' + resultNode['FeedType']],
                SubmittedDate: moment(resultNode['SubmittedDate']),
                FeedProcessingStatus: FeedProcessingStatus['' + resultNode['FeedProcessingStatus']],
                StartedProcessingDate: moment(resultNode['SubmittedDate']),
                CompletedProcessingDate: moment(resultNode['CompletedProcessingDate'])
            };
        }
        return FeedSubmissionResult;
    }());
    AmazonTypes.FeedSubmissionResult = FeedSubmissionResult;
    var GetFeedSubmissionListResult = (function () {
        function GetFeedSubmissionListResult(rawData) {
            var _this = this;
            this.rawData = rawData;
            this.feedSubmissionList = [];
            _.each(rawData['GetFeedSubmissionListResponse']['GetFeedSubmissionListResult']['FeedSubmissionInfo'], function (item) {
                var newSubmissionInfo = {
                    FeedSubmissionId: item['FeedSubmissionId'],
                    FeedType: FeedType['' + item['FeedType']],
                    SubmittedDate: moment(item['SubmittedDate']),
                    FeedProcessingStatus: FeedProcessingStatus['' + item['FeedProcessingStatus']],
                    StartedProcessingDate: moment(item['SubmittedDate']),
                    CompletedProcessingDate: moment(item['CompletedProcessingDate'])
                };
                _this.feedSubmissionList.push(newSubmissionInfo);
            });
        }
        return GetFeedSubmissionListResult;
    }());
    AmazonTypes.GetFeedSubmissionListResult = GetFeedSubmissionListResult;
    (function (FeedProcessingStatus) {
        FeedProcessingStatus[FeedProcessingStatus["_AWAITING_ASYNCHRONOUS_REPLY_"] = 0] = "_AWAITING_ASYNCHRONOUS_REPLY_";
        FeedProcessingStatus[FeedProcessingStatus["_CANCELLED_"] = 1] = "_CANCELLED_";
        FeedProcessingStatus[FeedProcessingStatus["_DONE_"] = 2] = "_DONE_";
        FeedProcessingStatus[FeedProcessingStatus["_IN_PROGRESS_"] = 3] = "_IN_PROGRESS_";
        FeedProcessingStatus[FeedProcessingStatus["_IN_SAFETY_NET_"] = 4] = "_IN_SAFETY_NET_";
        FeedProcessingStatus[FeedProcessingStatus["_SUBMITTED_"] = 5] = "_SUBMITTED_";
        FeedProcessingStatus[FeedProcessingStatus["_UNCONFIRMED_"] = 6] = "_UNCONFIRMED_";
    })(AmazonTypes.FeedProcessingStatus || (AmazonTypes.FeedProcessingStatus = {}));
    var FeedProcessingStatus = AmazonTypes.FeedProcessingStatus;
    ;
    (function (FeedContentType) {
        FeedContentType[FeedContentType['text/tab-separated-values; charset=iso-8859-1'] = 0] = 'text/tab-separated-values; charset=iso-8859-1';
        FeedContentType[FeedContentType['text/xml'] = 1] = 'text/xml';
    })(AmazonTypes.FeedContentType || (AmazonTypes.FeedContentType = {}));
    var FeedContentType = AmazonTypes.FeedContentType;
    ;
    (function (FeedType) {
        FeedType[FeedType['_POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA_'] = 0] = '_POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA_';
        FeedType[FeedType['_POST_ORDER_FULFILLMENT_DATA_'] = 1] = '_POST_ORDER_FULFILLMENT_DATA_';
    })(AmazonTypes.FeedType || (AmazonTypes.FeedType = {}));
    var FeedType = AmazonTypes.FeedType;
    ;
    AmazonTypes.MarketplaceIdDic = {
        'A1PA6795UKMFR9': 'DE',
        'A1RKKUPIHCS9HS': 'ES',
        'A13V1IB3VIYZZH': 'FR',
        'A21TJRUUN4KGV': 'IN',
        'APJ6JRA9NG5V4': 'IT',
        'A1F83G8C2ARO7P': 'UK'
    };
    (function (ReportType) {
        ReportType[ReportType["_GET_FLAT_FILE_OPEN_LISTINGS_DATA_"] = 0] = "_GET_FLAT_FILE_OPEN_LISTINGS_DATA_";
        ReportType[ReportType["_GET_FLAT_FILE_ORDERS_DATA_"] = 1] = "_GET_FLAT_FILE_ORDERS_DATA_";
        ReportType[ReportType["_GET_ORDERS_DATA_"] = 2] = "_GET_ORDERS_DATA_";
        ReportType[ReportType["_GET_CONVERGED_FLAT_FILE_ORDER_REPORT_DATA_"] = 3] = "_GET_CONVERGED_FLAT_FILE_ORDER_REPORT_DATA_";
    })(AmazonTypes.ReportType || (AmazonTypes.ReportType = {}));
    var ReportType = AmazonTypes.ReportType;
    ;
    (function (ReportProcessingStatus) {
        ReportProcessingStatus[ReportProcessingStatus["_SUBMITTED_"] = 0] = "_SUBMITTED_";
        ReportProcessingStatus[ReportProcessingStatus["_IN_PROGRESS_"] = 1] = "_IN_PROGRESS_";
        ReportProcessingStatus[ReportProcessingStatus["_CANCELLED_"] = 2] = "_CANCELLED_";
        ReportProcessingStatus[ReportProcessingStatus["_DONE_"] = 3] = "_DONE_";
        ReportProcessingStatus[ReportProcessingStatus["_DONE_NO_DATA_"] = 4] = "_DONE_NO_DATA_";
    })(AmazonTypes.ReportProcessingStatus || (AmazonTypes.ReportProcessingStatus = {}));
    var ReportProcessingStatus = AmazonTypes.ReportProcessingStatus;
    ;
    (function (ConditionId) {
        ConditionId[ConditionId["New"] = 0] = "New";
        ConditionId[ConditionId["Used"] = 1] = "Used";
        ConditionId[ConditionId["Collectible"] = 2] = "Collectible";
        ConditionId[ConditionId["Refurbished"] = 3] = "Refurbished";
        ConditionId[ConditionId["Preorder"] = 4] = "Preorder";
        ConditionId[ConditionId["Club"] = 5] = "Club";
    })(AmazonTypes.ConditionId || (AmazonTypes.ConditionId = {}));
    var ConditionId = AmazonTypes.ConditionId;
    ;
    (function (ConditionSubtypeId) {
        ConditionSubtypeId[ConditionSubtypeId["New"] = 0] = "New";
        ConditionSubtypeId[ConditionSubtypeId["Mint"] = 1] = "Mint";
        ConditionSubtypeId[ConditionSubtypeId['Very Good'] = 2] = 'Very Good';
        ConditionSubtypeId[ConditionSubtypeId["Good"] = 3] = "Good";
        ConditionSubtypeId[ConditionSubtypeId["Acceptable"] = 4] = "Acceptable";
        ConditionSubtypeId[ConditionSubtypeId["Poor"] = 5] = "Poor";
        ConditionSubtypeId[ConditionSubtypeId["Club"] = 6] = "Club";
        ConditionSubtypeId[ConditionSubtypeId["OEM"] = 7] = "OEM";
        ConditionSubtypeId[ConditionSubtypeId["Warranty"] = 8] = "Warranty";
        ConditionSubtypeId[ConditionSubtypeId['Refurbished Warranty'] = 9] = 'Refurbished Warranty';
        ConditionSubtypeId[ConditionSubtypeId["Refurbished"] = 10] = "Refurbished";
        ConditionSubtypeId[ConditionSubtypeId['Open Box'] = 11] = 'Open Box';
        ConditionSubtypeId[ConditionSubtypeId["Any"] = 12] = "Any";
        ConditionSubtypeId[ConditionSubtypeId["Other"] = 13] = "Other";
    })(AmazonTypes.ConditionSubtypeId || (AmazonTypes.ConditionSubtypeId = {}));
    var ConditionSubtypeId = AmazonTypes.ConditionSubtypeId;
    (function (OrderStatus) {
        OrderStatus[OrderStatus["Pending"] = 0] = "Pending";
        OrderStatus[OrderStatus["Unshipped"] = 1] = "Unshipped";
        OrderStatus[OrderStatus["PartiallyShipped"] = 2] = "PartiallyShipped";
        OrderStatus[OrderStatus["Shipped"] = 3] = "Shipped";
    })(AmazonTypes.OrderStatus || (AmazonTypes.OrderStatus = {}));
    var OrderStatus = AmazonTypes.OrderStatus;
    ;
    (function (FulfillmentChannel) {
        FulfillmentChannel[FulfillmentChannel["AFN"] = 0] = "AFN";
        FulfillmentChannel[FulfillmentChannel["MFN"] = 1] = "MFN";
    })(AmazonTypes.FulfillmentChannel || (AmazonTypes.FulfillmentChannel = {}));
    var FulfillmentChannel = AmazonTypes.FulfillmentChannel;
    ;
    (function (PaymentMethod) {
        PaymentMethod[PaymentMethod["COD"] = 0] = "COD";
        PaymentMethod[PaymentMethod["CVS"] = 1] = "CVS";
        PaymentMethod[PaymentMethod["Other"] = 2] = "Other";
    })(AmazonTypes.PaymentMethod || (AmazonTypes.PaymentMethod = {}));
    var PaymentMethod = AmazonTypes.PaymentMethod;
    ;
    (function (MarketplaceId) {
        MarketplaceId[MarketplaceId["A1PA6795UKMFR9"] = 0] = "A1PA6795UKMFR9";
        MarketplaceId[MarketplaceId["A1RKKUPIHCS9HS"] = 1] = "A1RKKUPIHCS9HS";
        MarketplaceId[MarketplaceId["A13V1IB3VIYZZH"] = 2] = "A13V1IB3VIYZZH";
        MarketplaceId[MarketplaceId["A21TJRUUN4KGV"] = 3] = "A21TJRUUN4KGV";
        MarketplaceId[MarketplaceId["APJ6JRA9NG5V4"] = 4] = "APJ6JRA9NG5V4";
        MarketplaceId[MarketplaceId["A1F83G8C2ARO7P"] = 5] = "A1F83G8C2ARO7P";
    })(AmazonTypes.MarketplaceId || (AmazonTypes.MarketplaceId = {}));
    var MarketplaceId = AmazonTypes.MarketplaceId;
    (function (ShipmentServiceLevelCategory) {
        ShipmentServiceLevelCategory[ShipmentServiceLevelCategory["Expedited"] = 0] = "Expedited";
        ShipmentServiceLevelCategory[ShipmentServiceLevelCategory["FreeEconomy"] = 1] = "FreeEconomy";
        ShipmentServiceLevelCategory[ShipmentServiceLevelCategory["NextDay"] = 2] = "NextDay";
        ShipmentServiceLevelCategory[ShipmentServiceLevelCategory["SameDay"] = 3] = "SameDay";
        ShipmentServiceLevelCategory[ShipmentServiceLevelCategory["SecondDay"] = 4] = "SecondDay";
        ShipmentServiceLevelCategory[ShipmentServiceLevelCategory["Scheduled"] = 5] = "Scheduled";
        ShipmentServiceLevelCategory[ShipmentServiceLevelCategory["Standard"] = 6] = "Standard";
    })(AmazonTypes.ShipmentServiceLevelCategory || (AmazonTypes.ShipmentServiceLevelCategory = {}));
    var ShipmentServiceLevelCategory = AmazonTypes.ShipmentServiceLevelCategory;
    ;
    (function (OrderType) {
        OrderType[OrderType["StandardOrder"] = 0] = "StandardOrder";
        OrderType[OrderType["Preorder"] = 1] = "Preorder";
    })(AmazonTypes.OrderType || (AmazonTypes.OrderType = {}));
    var OrderType = AmazonTypes.OrderType;
    ;
    ;
    ;
})(AmazonTypes || (AmazonTypes = {}));
module.exports = AmazonTypes;
//# sourceMappingURL=types.js.map