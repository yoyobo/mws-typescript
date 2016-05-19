"use strict";
var moment = require('moment');
var CSV = require('../csv/CSVExport');
exports.FlatFileOrderFulfillmentFeedOptions = {
    columns: ['order-id', 'ship-date', 'carrier-code', 'carrier-name', 'tracking-number', 'ship-method'],
    defaults: {
        'ship-date': moment().format('YYYY-MM-DD'),
        'carrier-code': 'DHL',
        'carrier-name': 'DHL',
        'ship-method': 'DHL Paket'
    },
    firstLine: null,
    columnDelim: "\t",
    lineDelim: "\r\n",
    decSep: '.',
    inputEncoding: CSV.Encoding['UTF-8'],
    outputEncoding: CSV.Encoding['ISO-8859-1']
};
(function (Carrier) {
    Carrier[Carrier["USPS"] = 0] = "USPS";
    Carrier[Carrier["UPS"] = 1] = "UPS";
    Carrier[Carrier["FedEx"] = 2] = "FedEx";
    Carrier[Carrier["DHL"] = 3] = "DHL";
    Carrier[Carrier["Fastway"] = 4] = "Fastway";
    Carrier[Carrier["GLS"] = 5] = "GLS";
    Carrier[Carrier["GO!"] = 6] = "GO!";
    Carrier[Carrier["Hermes Logistik Gruppe"] = 7] = "Hermes Logistik Gruppe";
    Carrier[Carrier["Royal Mail"] = 8] = "Royal Mail";
    Carrier[Carrier["Parcelforce"] = 9] = "Parcelforce";
    Carrier[Carrier["City Link"] = 10] = "City Link";
    Carrier[Carrier["TNT"] = 11] = "TNT";
    Carrier[Carrier["Target"] = 12] = "Target";
    Carrier[Carrier["Other"] = 13] = "Other";
})(exports.Carrier || (exports.Carrier = {}));
var Carrier = exports.Carrier;
;
exports.FlatFilePriceandQuantityUpdateFeedOptions = {
    columns: ['sku', 'price', 'quantity'],
    defaults: {},
    firstLine: null,
    columnDelim: "\t",
    lineDelim: "\r\n",
    decSep: ',',
    inputEncoding: CSV.Encoding['UTF-8'],
    outputEncoding: CSV.Encoding['ISO-8859-1']
};
//# sourceMappingURL=schemas.js.map