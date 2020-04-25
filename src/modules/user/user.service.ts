import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { FindConditions } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { EncryptionService } from 'src/shared/services/encryption.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailSenderService } from 'src/shared/services/emailsender.service';
import { UtilService } from 'src/shared/services/util.service';

@Injectable()
export class UserService {
    constructor(
        public readonly userRepository: UserRepository,
        private readonly mailerService: MailerService,
        private readonly emailSenderService: EmailSenderService
    ) {}

    findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
        return this.userRepository.findOne(findData);
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({
            where: { email },
        });
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

        try {
            var emailtoken = UtilService.GenerateUUID();
            
            var emailbody = `
            Hi! <br><br> Thanks for your registration<br><br>
            <a href='http://localhost:5100/api/auth/email/verify/${emailtoken}'>Click here to activate your account</a>
            `
            console.log(emailtoken);

            var emailResponse = await this.emailSenderService.SendEmail(userRegisterDto.email, 'Testing Nest MailerModule ✔', emailbody);
            console.log("mail",JSON.stringify(emailResponse));
        }catch(error){
            console.log(error);
        }

        var checkIfUserExist = await this.getUserByEmail(userRegisterDto.email);

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
