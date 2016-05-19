import AmazonTypes = require('./types');
export declare class Request {
    private endpoint;
    private credentials;
    private parameters;
    private body;
    constructor(endpoint: string, credentials: AmazonTypes.Credentials);
    addParam(param: AmazonTypes.Parameter): void;
    setBody(body: AmazonTypes.BodyData): void;
    send(callback: AmazonTypes.ResultCallback): void;
    private getSignature();
    private getQueryString();
    private getStringToSign(endpoint);
    private urlEncode(input);
    private hexStrToBase64(input);
    private hex_md5(s);
}
