import {BadRequestException, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { TokenPayloadDto } from './dto/token_payload.dto';
import { UserLoginDto } from './dto/user_login.dto';
import { EncryptionService } from 'src/shared/services/encryption.service';
import { UserEntity } from 'src/database/entities/user.entity';
import { EnvironmentConfigService } from 'src/config/environment.config';
import { AppConfigurationEnum } from 'src/config/config.enum';
import { ContextService } from 'src/shared/services/context.service';

const lockOutTimes = 3;

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
            expiresIn: parseInt(
                this.configService.get(
                    AppConfigurationEnum.JWT_EXPIRATION_TIME,
                ),
            ),
            accessToken: await this.jwtService.signAsync({
                sub: user.Id,
                iss: '',
                name: `${user.FirstName} ${user.LastName}`,
                data: {
                    firstname: user.FirstName,
                    lastname: user.LastName,
                    picture: '',
                    phonenumber: user.PhoneNumber,
                    username: user.UserName,
                    role: user.Role
                },
            }),
        });
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
        const user = await this.userService.findOne({
            Email: userLoginDto.email,
        });

        const isPasswordValid = await EncryptionService.validateHash(
            userLoginDto.password,
            user && user.PasswordHash,
        );

        if (!user) {
            throw new BadRequestException("User credential is invalid");
        }

        if (!isPasswordValid) {
            if (user.LockoutEnabled) {

                if (user.LockoutEndDateUtc > new Date()) {
                    //todo: put the remaining time there
                    throw new BadRequestException("Sorry your account still locked");
                }

                const accessFailedCount = await this.userService.getAccessFailedCount(user);
                if (accessFailedCount == lockOutTimes){
                    throw new BadRequestException("Sorry your account is locked due to the wrong credentials provided, you can try after five(5) minutes");
                }

                await this.userService.processUserAccountLock(user);
                throw new BadRequestException("User credential is invalid");
            }
            throw new BadRequestException("User credential is invalid");
        }

        const hasUserConfirmedEmail = await this.userService.hasUserVerifiedEmail(user);

        if (!hasUserConfirmedEmail){
            throw new BadRequestException("User need to confirm email before the system can authorize access.")
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
