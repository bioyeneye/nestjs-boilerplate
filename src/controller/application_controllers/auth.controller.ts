import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Body,
    Post,
    UseGuards,
    UseInterceptors,
    Req, HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '../../services/app_services/user.service';
import { AuthService } from '../../services/app_services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/database/entities/user.entity';
import { AuthUserInterceptor } from 'src/shared/interceptors/auth-user-interceptor.service';
import { AuthUser } from 'src/shared/decorators/auth-user.decorator';
import { Request } from 'express';
import {
    TokenPayloadDto,
    UserEmailVerificationDto,
    UserLoginDto,
    UserRequestEmailVerificationDto
} from "../../model/auth.dto";
import {UserDto, UserRegisterDto} from "../../model/user.dto";

interface UserCreatedResponse {
    user: UserDto,
    token: TokenPayloadDto
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        public readonly userService: UserService,
        public readonly authService: AuthService,
    ) {}

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
    async userRegister(
        @Req() request: Request,
        @Body() userRegisterDto: UserRegisterDto,
    ): Promise<UserCreatedResponse> {

        const userDto = new UserRegisterDto();
        Object.assign(userDto, userRegisterDto);

        const createdUser = await this.userService.createUser(
            userDto,
        );

        const token = await this.authService.createToken(createdUser);
        return  {
            user: new UserDto(createdUser),
            token: token
        };
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: TokenPayloadDto,
        description: 'User info with access token',
    })
    async userLogin(@Req() request: Request, @Body() model: UserLoginDto): Promise<TokenPayloadDto> {
        const userEntity = await this.authService.validateUser(model);
        const token = await this.authService.createToken(userEntity);
        return token;
    }

    @Post('verifyemail')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: TokenPayloadDto,
        description: 'User info with access token',
    })
    async verifyemail(@Req() request: Request, @Body() model: UserEmailVerificationDto): Promise<any> {
        const serviceResponse = await this.userService.verifyEmail(model.email, model.token);
        if (serviceResponse.hasError && serviceResponse.hasError == true) {
            throw new HttpException(
                serviceResponse.errorMessage,
                serviceResponse.httpStatus
            );
        }

        return {
            message: serviceResponse.data
        };
    }

    @Post('requestemailverification')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: TokenPayloadDto,
        description: 'User info with access token',
    })
    async requestEmailVerification(@Req() request: Request, @Body() model: UserRequestEmailVerificationDto): Promise<any> {
        const serviceResponse = await this.userService.requestEmailVerification(model.email);
        if (serviceResponse.hasError && serviceResponse.hasError == true) {
            throw new HttpException(
                serviceResponse.errorMessage,
                serviceResponse.httpStatus
            );
        }

        return {
            message: serviceResponse.data
        };
    }


    @Get('me')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserDto, description: 'current user info' })
    getCurrentUser(@AuthUser() user: UserEntity) {
        return new UserDto(user);
    }
}
