import { Global, HttpModule, Module } from '@nestjs/common';
import { AuthUserInterceptor } from './interceptors/auth-user-interceptor.service';

const providers = [
    //AuthUserInterceptor
];

@Global()
@Module({
    providers,
    imports: [HttpModule],
    exports: [...providers, HttpModule],
})
export class SharedModule {}
