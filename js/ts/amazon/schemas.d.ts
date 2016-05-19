import moment = require('moment');
import CSV = require('../csv/CSVExport');
export interface FlatFileOrderFulfillmentFeedRecord {
    'order-id': string;
    'order-item-id'?: string;
    quantity?: string;
    'ship-date'?: moment.Moment;
    'carrier-code'?: string;
    'carrier-name'?: string;
    'tracking-number'?: string;
    'ship-method'?: string;
}
export declare var FlatFileOrderFulfillmentFeedOptions: CSV.Options;
export declare enum Carrier {
    "USPS" = 0,
    "UPS" = 1,
    "FedEx" = 2,
    "DHL" = 3,
    "Fastway" = 4,
    "GLS" = 5,
    "GO!" = 6,
    "Hermes Logistik Gruppe" = 7,
    "Royal Mail" = 8,
    "Parcelforce" = 9,
    "City Link" = 10,
    "TNT" = 11,
    "Target" = 12,
    "Other" = 13,
}
export interface FlatFilePriceandQuantityUpdateFeedRecord {
    sku: string;
    price?: number;
    'minimum-seller-allowed-price'?: number;
    'maximum-seller-allowed-price'?: number;
    'quantity': number;
    'fulfillment-channel'?: string;
    'leadtime-to-ship'?: number;
}
export declare var FlatFilePriceandQuantityUpdateFeedOptions: CSV.Options;
