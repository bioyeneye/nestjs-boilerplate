import {CacheModule, DynamicModule, Global, Module} from "@nestjs/common";
import {ServiceConfig} from "./service.config";
import {SharedModule} from "../shared/shared.module";
import {ApplicationRepositoryModule} from "../repositories/repository.module";
import {applicationservices, thirdpartyservices} from "./index";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {MailerModule} from "@nestjs-modules/mailer";
import {jwtOptions, mailOptions, passportOptions, USEROPTIONS} from "./serviceoptions";

@Global()
@Module({

})
export class ApplicationServicesModule {
    static forRoot(config: ServiceConfig): DynamicModule {
        return {
            module: ApplicationServicesModule,
            providers: [
                {
                    provide: USEROPTIONS,
                    useValue: config.userOptions,
                },
                ...applicationservices,
                ...thirdpartyservices
            ],
            exports: [
                PassportModule.register({defaultStrategy: 'jwt'}),
                ...applicationservices,
                ...thirdpartyservices,
            ],
            imports: [
                ApplicationRepositoryModule,
                SharedModule,
                PassportModule.register(passportOptions),
                JwtModule.register(jwtOptions),
                MailerModule.forRootAsync({ useFactory: () => (mailOptions)}),
            ],
        };
    }
}