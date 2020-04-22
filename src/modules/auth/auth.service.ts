import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { TokenPayloadDto } from './dto/token_payload.dto';
import { UserLoginDto } from './dto/user_login.dto';
import { EncryptionService } from 'src/shared/services/encryption.service';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserNotFoundException } from 'src/shared/exception/user-not-found.exception';
import { EnvironmentConfigService } from 'src/config/environment.config';
import { AppConfigurationEnum } from 'src/config/config.enum';
import { ContextService } from 'src/shared/services/context.service';

@Injectable()
export class AuthService {
    private static _authUserKey = 'user_key';

    constructor(
        public readonly jwtService: JwtService,
        public readonly configService: EnvironmentConfigService,
        public readonly userService: UserService,
    ) {}

    async createToken(user: UserEntity | UserDto): Promise<TokenPayloadDto> {
        return new TokenPayloadDto({
            expiresIn: parseInt(this.configService.get(AppConfigurationEnum.JWT_EXPIRATION_TIME)),
            accessToken: await this.jwtService.signAsync({ id: user.id }),
        });
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
        const user = await this.userService.findOne({
            email: userLoginDto.email,
        });

        const isPasswordValid = await EncryptionService.validateHash(
            userLoginDto.password,
            user && user.passwordHash,
        );

        if (!user || !isPasswordValid) {
            throw new UserNotFoundException();
        }

        return user;
    }

    static setAuthUser(user: UserEntity) {
        ContextService.set(AuthService._authUserKey, user);
    }

    static getAuthUser(): UserEntity {
        return ContextService.get(AuthService._authUserKey);
    }
}
