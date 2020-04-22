import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { FindConditions } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { EncryptionService } from 'src/shared/services/encryption.service';

@Injectable()
export class UserService {
    constructor(public readonly userRepository: UserRepository) {}

    /**
     * Find single user
     */
    findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
        return new Promise<UserEntity>((resolse, reject) => {
            var user = new UserEntity();
            user.email = 'johndoe@email.com';
            user.emailConfirmed = true;
            user.createdDate = new Date();
            user.id = EncryptionService.generateRandomString();
            user.firstName = 'John';
            user.lastName = 'Doe';
            user.passwordHash = EncryptionService.generateHash('password');
            user.phoneNumber = '08062986510';
            user.phoneNumberConfirmed = true;
            user.userName = 'johndoe';

            return resolse(user);
        });

        return this.userRepository.findOne(findData);
    }

    async findByUsernameOrEmail(
        options: Partial<{ username: string; email: string }>,
    ): Promise<UserEntity | undefined> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        if (options.email) {
            queryBuilder.orWhere('user.email = :email', {
                email: options.email,
            });
        }
        if (options.username) {
            queryBuilder.orWhere('user.username = :username', {
                username: options.username,
            });
        }

        return queryBuilder.getOne();
    }
}
