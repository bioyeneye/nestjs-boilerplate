import {CacheModule, DynamicModule, forwardRef, Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {AuthModule} from '../auth/auth.module';
import {UserController} from './user.controller';
import {UserRepository} from './user.repository';
import {UserService} from './user.service';
import {SharedModule} from 'src/shared/shared.module';

export interface UserOptions {
    LockoutAccessCount: number;
    LockoutExpiryMinute: number;
    EmailConfirmationRequired: boolean;
    EnableLockoutForNewUsers: boolean;
}

@Global()
@Module({
    imports: [
        //forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([UserRepository]),
        SharedModule,
        CacheModule.register(),
    ],
    controllers: [UserController],
})
export class UserModule {
    static forRoot(settings: UserOptions): DynamicModule {
        const providers = [
            UserService
        ];
        return {
            module: UserModule,
            providers: [
                {
                    provide: 'USER-OPTIONS',
                    useValue: settings,
                },
                ...providers
            ],
            exports: [...providers]
        };
    }
}
