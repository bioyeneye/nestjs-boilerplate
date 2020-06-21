import {DynamicModule, Module} from "@nestjs/common";
import {controllers} from "./index";
import {ApplicationServicesModule} from "../services/services.module";
import {ServiceConfig} from "../services/service.config";

@Module({
    controllers: [...controllers]
})
export class ApplicationControllerModule {
    static forRoot(config: ServiceConfig): DynamicModule {
        return {
            module: ApplicationControllerModule,
            imports: [
                ApplicationServicesModule.forRoot(config),
            ],
            providers: [
            ],
        };
    }
}