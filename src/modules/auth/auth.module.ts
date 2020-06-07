import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentConfigService } from 'src/config/environment.config';

@Module({
    imports: [
        //forwardRef(() => UserModule),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '1h' },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, EnvironmentConfigService],
    exports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthService],
})
export class AuthModule {}
