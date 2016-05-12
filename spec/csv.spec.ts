///<reference path="../typings/main.d.ts"/>
import CSV = require('../lib/csv/CSVExport');
import fs = require('fs');

describe('CSV', function() {
    it('works.', function(done) {
        var options: CSV.Options = {
            columns: ['col1', 'col2', 'col3'],
            defaults: {
                col1: 'defcol1',
                col2: 'defcol2',
                col3: 'defcol3',
            },
            firstLine: "Some fancy first line",
            columnDelim: "\t",
            lineDelim: "\r\n",
            decSep: "D",
            inputEncoding: CSV.Encoding['UTF-8'],
            outputEncoding: CSV.Encoding['ISO-8859-1']
        };

        var csv: CSV.CSVExport = new CSV.CSVExport(__dirname + '/../../csvtest.txt', options);

        csv.start(function() {
            csv.record({ col1: 'line1_col1', col3: 'line1_col3' }, function() {
                csv.record({ col2: 'line2_col2', col3: 'line2_col3' }, function() {
                    csv.record({ col1: 42.23, col2: 'line3_col2' }, function() {
                        csv.close(function(filePath) {
                            console.log(filePath);
                            var generatedFileContent = fs.readFileSync(filePath, 'utf-8');
                            expect(generatedFileContent).toEqual(referenceFileContent);
                            console.log(generatedFileContent);
                            done();
                        });
                    });
                });
            });
        });

    });
});
var referenceFileContent = "Some fancy first line\r\ncol1	col2	col3\r\nline1_col1	defcol2	line1_col3\r\ndefcol1	line2_col2	line2_col3\r\n42D23	line3_col2	defcol3\r\n";