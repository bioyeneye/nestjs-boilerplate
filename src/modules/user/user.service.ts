import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { FindConditions } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { EncryptionService } from 'src/shared/services/encryption.service';
import { UserRegisterDto } from './dto/user-register.dto';

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

    async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
        
        var checkIfUserExist = await this.userRepository.findOne({
            where: { email: userRegisterDto.email },
        });
        if (checkIfUserExist != null) {
            throw new HttpException(
                `User already exist with the email: ${userRegisterDto.email}`,
                HttpStatus.BAD_REQUEST,
            );
        }
        
        try {
            

            const user = this.userRepository.create({
                ...userRegisterDto,
                userName: userRegisterDto.email,
                passwordHash: EncryptionService.generateHash(
                    userRegisterDto.password,
                ),
            });
            return this.userRepository.save(user);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
