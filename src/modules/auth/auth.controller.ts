import { Controller, Get, HttpCode, HttpStatus, Body } from "@nestjs/common";import { ApiTags, ApiOkResponse } from "@nestjs/swagger";import { UserService } from "../user/user.service";import { AuthService } from "./auth.service";
import { LoginPayloadDto } from "./dto/login_payload";
import { UserLoginDto } from "./dto/user_login.dto";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        public readonly userService: UserService,
        public readonly authService: AuthService,
    ) {}

    @Get('state')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: LoginPayloadDto,
        description: 'User info with access token',
    })
    async userLogin(): Promise<LoginPayloadDto> {
        const userEntity = await this.authService.validateUser({email: '', password: ''});

        const token = await this.authService.createToken(userEntity);
        return new LoginPayloadDto(null, token);
    }
}