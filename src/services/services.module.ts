import {DynamicModule, Global, MiddlewareConsumer, Module, NestModule, Provider} from "@nestjs/common";
import {ServiceConfig} from "./service.config";

@Global()
@Module({
    providers: [
    ],
    imports: [
    ],
})
export class ServicesModule {
    static forRoot(config: ServiceConfig): DynamicModule {
        return {
            module: ServicesModule,
            providers: [],
            exports: [],
        };
    }
}