'use strict';

import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserEntity } from 'src/database/entities/user.entity';


@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UserController {
    constructor(private _userService: UserService) {}
}
