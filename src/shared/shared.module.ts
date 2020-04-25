import { Global, HttpModule, Module } from '@nestjs/common';
import { AuthUserInterceptor } from './interceptors/auth-user-interceptor.service';
import { EmailSenderService } from './services/emailsender.service';

const providers = [
    //AuthUserInterceptor
    EmailSenderService
];

@Global()
@Module({
    providers,
    imports: [HttpModule],
    exports: [...providers, HttpModule],
})
export class SharedModule {}
