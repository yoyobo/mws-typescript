"use strict";
var _ = require('underscore');
var fs = require('fs');
var Iconv = require('iconv').Iconv;
(function (Encoding) {
    Encoding[Encoding['UTF-8'] = 0] = 'UTF-8';
    Encoding[Encoding['ISO-8859-1'] = 1] = 'ISO-8859-1';
})(exports.Encoding || (exports.Encoding = {}));
var Encoding = exports.Encoding;
;
var CSVExport = (function () {
    function CSVExport(filePath, options) {
        this.options = options;
        this.filePath = filePath;
        this.escReg = new RegExp('"', 'g');
        this.converter = new Iconv(Encoding[options.inputEncoding], Encoding[options.outputEncoding]);
    }
    CSVExport.prototype.start = function (callback) {
        // Create WriteStream
        this.stream = fs.createWriteStream(this.filePath);
        var header = '';
        // Insert first line if necessary
        if (!!this.options.firstLine)
            header += this.options.firstLine + this.options.lineDelim;
        // Build column line
        header += this.options.columns.join(this.options.columnDelim) + this.options.lineDelim;
        // Write header to file
        CSVExport.writeToStream(this.converter.convert(header), this.stream, callback);
    };
    CSVExport.prototype.record = function (data, callback) {
        var self = this;
        var outputString = '';
        _.each(this.options.columns, function (elm, index, list) {
            // Take value from input data or default value or empty string (in this order) and escape the result
            var dataValue = self.escapeString(_.has(data, elm) ? data[elm] : (_.has(self.options.defaults, elm) ? self.options.defaults[elm] : ''));
            if (_.isNumber(dataValue))
                dataValue = dataValue.toString().replace('.', self.options.decSep);
            // Append column separator, if not in last column
            outputString += (!dataValue ? '' : dataValue) + ((index == list.length - 1) ? '' : self.options.columnDelim);
        });
        outputString += this.options.lineDelim;
        CSVExport.writeToStream(this.converter.convert(outputString), this.stream, callback);
    };
    ;
    CSVExport.prototype.close = function (callback) {
        var self = this;
        this.stream.end("", function () {
            callback(self.filePath);
        });
    };
    ;
    CSVExport.writeToStream = function (data, stream, callback) {
        var writeReturn = stream.write(data, function () {
            if (false === writeReturn) {
                stream.once('drain', function () {
                    callback();
                });
            }
            else {
                callback();
            }
        });
    };
    CSVExport.prototype.escapeString = function (str) {
        if (this.escReg.test(str)) {
            str = '"' + str.replace(this.escReg, '""') + '"';
        }
        return str;
    };
    return CSVExport;
}());
exports.CSVExport = CSVExport;
//# sourceMappingURL=CSVExport.js.map