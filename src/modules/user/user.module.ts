import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([UserRepository]),
        SharedModule
    ],
    controllers: [UserController],
    exports: [UserService],
    providers: [UserService],
})
export class UserModule {}
