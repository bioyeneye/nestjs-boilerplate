'use strict';

import {
    Controller, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../services/app_services/user.service';
import {RolesGuard} from "../../shared/guards/roles.guard";
import {AuthGuard} from "../../shared/guards/auth.guard";
import {AuthUserInterceptor} from "../../shared/interceptors/auth-user-interceptor.service";


@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class UserController {
    constructor(private _userService: UserService) {}

}
