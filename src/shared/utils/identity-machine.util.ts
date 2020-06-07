import {IRequest} from "../interface/request.interface";

export class IdentifyMachineUtils {
    // tslint:disable-next-line:no-empty
    constructor(readonly req: IRequest) {}

    sender() {

        //const xForwardedFor = (this.req.headers['x-forwarded-for'] || '').replace(/:\d+$/, '');
        const xForwardedFor = (this.req.headers['x-forwarded-for'] || '');
        const ip = xForwardedFor || this.req.connection.remoteAddress;

        const source = this.req.headers['user-agent'];
        const userAgent = source;

        return {
            ip: ip,
            userAgent: userAgent,
        };
    }
}