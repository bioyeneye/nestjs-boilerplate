import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Body,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/login_payload';
import { UserLoginDto } from './dto/user_login.dto';
import { UserDto } from '../user/dto/user.dto';
import { TokenPayloadDto } from './dto/token_payload.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/database/entities/user.entity';
import { AuthUserInterceptor } from 'src/shared/interceptors/auth-user-interceptor.service';
import { AuthUser } from 'src/shared/decorators/auth-user.decorator';
import { UserRegisterDto } from '../user/dto/user-register.dto';

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
        @Body() userRegisterDto: UserRegisterDto,
    ): Promise<UserDto> {
        const createdUser = await this.userService.createUser(
            userRegisterDto,
        );

        return new UserDto(createdUser);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: TokenPayloadDto,
        description: 'User info with access token',
    })
    async userLogin(@Body() model: UserLoginDto): Promise<TokenPayloadDto> {
        const userEntity = await this.authService.validateUser(model);
        const token = await this.authService.createToken(userEntity);
        return token;
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
