import moment = require('moment');
import CSV = require('../lib/csv/CSVExport');
export interface FlatFileOrderFulfillmentFeedRecord {
    // https://images-na.ssl-images-amazon.com/images/G/01/rainier/help/ff/release_1_9/Flat.File.ShippingConfirm.de.xls
    // _POST_FLAT_FILE_FULFILLMENT_DATA_
    'order-id': string,
    'order-item-id'?: string,
    quantity?: string,
    'ship-date': moment.Moment, //format for export: YYYY-MM-TT
    'carrier-code'?: Carrier,
    'carrier-name'?: string,
    'tracking-number'?: string,
    'ship-method'?: string
}

// export var FlatFileOrderFulfillmentFeedOptions : CSV.Options = {
    // columns : string[],
    // defaults : {[ s: string] : string},
    // firstLine : string,
    // columnDelim : string,
    // lineDelim : string,
    // decSep : string,
    // // type : string,
    // inputEncoding : Encoding,
    // outputEncoding : Encoding
// }

export enum Carrier { "USPS", "UPS", "FedEx", "DHL", "Fastway", "GLS", "GO!", "Hermes Logistik Gruppe", "Royal Mail", "Parcelforce", "City Link", "TNT", "Target", "Other" };

export interface FlatFilePriceandQuantityUpdateFeedRecord {
    // https://s3.amazonaws.com/seller-templates/ff/eu/de/Flat.File.PriceInventory.de.xls
    // 	_POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA_
    sku: string,
    price?: number, // must probably be set in export file in any case with an empty string
    'minimum-seller-allowed-price'?: number,
    'maximum-seller-allowed-price'?: number,
    'quantity': number,
    'fulfillment-channel'?: string,
    'leadtime-to-ship'?: number
}
