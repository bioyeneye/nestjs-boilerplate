import {HttpStatus} from "@nestjs/common";

export interface ServiceResponse<T> {
    httpStatus?: HttpStatus;
    hasError?: boolean;
    errorMessage?: string
    data?: T;
}

export class ServiceResponseInterface{

    static getServiceResponse<T>(data: T, errorMessage: string, hasError: boolean, httpStatus: HttpStatus) : ServiceResponse<T> {
        return {
            data: data,
            errorMessage: errorMessage,
            hasError: hasError,
            httpStatus: httpStatus,
        }
    }
}