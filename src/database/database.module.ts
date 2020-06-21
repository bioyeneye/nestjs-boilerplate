import {Module, DynamicModule} from '@nestjs/common';
import {subscribers} from './subscribers';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EnvironmentConfigService} from "../shared/config/environment.config";
import {DatabaseConfigurationEnum} from "../shared/config/config.enum";
import {SharedModule} from "../shared/shared.module";

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [SharedModule],
        useFactory: async (configService: EnvironmentConfigService) => ({
            type: 'postgres' as 'postgres',
            url: process.env.DATABASE_URL ||
                `postgres://${configService.get(DatabaseConfigurationEnum.DBUSERNAME)}:${configService.get(DatabaseConfigurationEnum.DBPASSWORD)}@${configService.get(DatabaseConfigurationEnum.DBHOST)}:${configService.get(DatabaseConfigurationEnum.DBHOST)}/${configService.get(DatabaseConfigurationEnum.DBNAME)}`,
            // host: configService.get(DatabaseConfigurationEnum.DBHOST),
            // port: Number(configService.get(DatabaseConfigurationEnum.DBPORT)),
            // username: configService.get(DatabaseConfigurationEnum.DBUSERNAME),
            // password: configService.get(DatabaseConfigurationEnum.DBPASSWORD),
            // database:  configService.get(DatabaseConfigurationEnum.DBNAME),
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
            ssl: true,
            extra: {
                ssl: {
                    rejectUnauthorized: false,
                },
            },
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
