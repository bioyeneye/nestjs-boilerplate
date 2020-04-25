import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailSenderService {
    constructor(private readonly mailerService: MailerService) {}

    async SendEmail(to: string, subject: string, body: string) {
        return await this.mailerService.sendMail({
            to: to, // list of receivers
            from: 'noreply@nestjsboilerplate.com', // sender address
            subject: subject, // Subject line
            text: body, // plaintext body
            html: body, // HTML body content
        });
    }
}
