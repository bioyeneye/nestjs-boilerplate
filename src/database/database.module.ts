import {Module, DynamicModule} from '@nestjs/common';
import {subscribers} from './subscribers';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EnvironmentConfigService} from "../config/environment.config";
import {DatabaseConfigurationEnum} from "../config/config.enum";
import {SharedModule} from "../shared/shared.module";
import {UserEntity} from "./entities/user.entity";
import {SmsVerificationEntity} from "./entities/sms-verification.entity";
import {EmailVerificationEntity} from "./entities/email-verification.entity";
import {AuditTrail} from "./entities/audittrail.entity";
import {AuditSection} from "./entities/auditsection.entity";
import {AuditAction} from "./entities/auditaction.entity";



const entities = [
    UserEntity,
    AuditAction,
    AuditSection,
    AuditTrail,
    EmailVerificationEntity,
    SmsVerificationEntity
]

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [SharedModule],
        useFactory: async (configService: EnvironmentConfigService) => ({
            type: 'postgres' as 'postgres',
            host: configService.get(DatabaseConfigurationEnum.DBHOST),
            port: Number(configService.get(DatabaseConfigurationEnum.DBPORT)),
            username: configService.get(DatabaseConfigurationEnum.DBUSERNAME),
            password: configService.get(DatabaseConfigurationEnum.DBPASSWORD),
            database:  configService.get(DatabaseConfigurationEnum.DBNAME),
            entities: [
                "./src/database/entities/**/*.entity.js",
                "./dist/database/entities/**/*.entity.js"
            ],
            synchronize: false,
            autoLoadEntities: true,
            logging: true,
            migrationsTableName: "custom_migration_table",
            migrations: [
                "./src/database/migrations/**/*.js",
                "./dist/database/migrations/**/*.js"
            ],
            subscribers: [
                "./src/database/subscribers/**/*.subscriber.js",
                "./dist/database/subscribers/**/*.subscriber.js"
            ],
            cli: {
                "entitiesDir": "src/database/entities",
                "migrationsDir": "src/database/migrations",
                "subscribersDir": "src/database/subscribers"
            },
            // ssl: true,
            // extra: {
            //     ssl: {
            //         rejectUnauthorized: false,
            //     },
            // },
        }),
        inject: [EnvironmentConfigService]
    }),],
    providers: [],
    exports: []
})
export class DatabaseModule {
    static forRoot(): DynamicModule {
        const providers: any[] = [].concat(subscribers)
        return {
            module: DatabaseModule,
            providers: providers,
            exports: providers,
            imports: []
        }
    }
}
