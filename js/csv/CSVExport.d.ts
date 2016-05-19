import fs = require('fs');
export interface Options {
    columns: string[];
    defaults: {
        [s: string]: string;
    };
    firstLine: string;
    columnDelim: string;
    lineDelim: string;
    decSep: string;
    inputEncoding: Encoding;
    outputEncoding: Encoding;
}
export interface ReadyCallback {
    (): any;
}
export interface CloseCallback {
    (msg: string): any;
}
export declare enum Encoding {
    'UTF-8' = 0,
    'ISO-8859-1' = 1,
}
export declare class CSVExport {
    private options;
    private filePath;
    private escReg;
    private converter;
    private stream;
    constructor(filePath: string, options: Options);
    start(callback: ReadyCallback): void;
    record(data: Object, callback: ReadyCallback): void;
    close(callback: CloseCallback): void;
    static writeToStream(data: Buffer, stream: fs.WriteStream, callback: any): void;
    private escapeString(str);
}
