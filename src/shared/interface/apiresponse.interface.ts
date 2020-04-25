export interface IApiResponse {
    success: boolean;
    message: string;
    errorMessage: string;
    data?: any[];
    error: any;
    timestamp: string;
    statusCode: string;
}
