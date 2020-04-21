import { Global, HttpModule, Module } from '@nestjs/common';

const providers = [];

@Global()
@Module({
    providers,
    imports: [HttpModule],
    exports: [...providers, HttpModule],
})
export class SharedModule {}
