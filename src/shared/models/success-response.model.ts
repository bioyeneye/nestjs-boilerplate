// success: true => message, data
// success: false => errorMessage, error

import { IApiResponse } from "../interface/apiresponse.interface";

export class ResponseError implements IApiResponse {
    constructor(infoMessage: string, data?: any) {
        this.success = false;
        this.message = infoMessage;
        this.data = data;
        this.timestamp = new Date().toISOString();
    }
    timestamp: string;
    message: string;
    data?: any[];
    errorMessage: any;
    error: any;
    success: boolean;
    statusCode: any;
    errors: any;
    path: any;
}

export class ResponseSuccess implements IApiResponse {
    constructor(statusCode: string, infoMessage: string, data?: any, notLog?: boolean) {
        this.success = true;
        this.message = infoMessage;
        this.data = data;
        if (!notLog) {
            try {
                var offuscateRequest = JSON.parse(JSON.stringify(data));
                if (offuscateRequest && offuscateRequest.token)
                    offuscateRequest.token = '*******';
                console.log(
                    new Date().toString() +
                        ' - [Response]: ' +
                        JSON.stringify(offuscateRequest),
                );
            } catch (error) {}
        }
        this.timestamp = new Date().toISOString();
        this.statusCode = statusCode;
    }
    timestamp: string;
    message: string;
    data: any[];
    errorMessage: any;
    error: any;
    success: boolean;
    statusCode: any;
}
