'use strict';

import {
    Controller, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {RolesGuard} from "../../shared/guards/roles.guard";
import {AuthGuard} from "../../shared/guards/auth.guard";
import {AuthUserInterceptor} from "../../shared/interceptors/auth-user-interceptor.service";
import {HttpCacheInterceptor} from "../../shared/interceptors/http-cache.interceptor";


@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@UseInterceptors(HttpCacheInterceptor)
@ApiBearerAuth()
export class UserController {
    constructor(private _userService: UserService) {}



}
