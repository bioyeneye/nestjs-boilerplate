import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EnvironmentConfigService } from 'src/config/environment.config';

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'yuuuuu',
            signOptions: { expiresIn: '60s' },
          }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, EnvironmentConfigService],
    exports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthService],
})
export class AuthModule {}
