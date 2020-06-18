import {BadRequestException, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {UserRepository} from './user.repository';
import {FindConditions} from 'typeorm';
import {UserEntity} from 'src/database/entities/user.entity';
import {EncryptionService} from 'src/shared/services/encryption.service';
import {UserRegisterDto} from './dto/user-register.dto';
import {EmailSenderService} from 'src/shared/services/emailsender.service';
import {UtilService} from 'src/shared/services/util.service';
import "../../shared/utils/date-ext";
import {UserOptions} from "./user.module";
import {ServiceResponse, ServiceResponseInterface} from "../../shared/interface/service-response.interface";

@Injectable()
export class UserService {
    constructor(
        public readonly userRepository: UserRepository,
        private readonly emailSenderService: EmailSenderService,
        @Inject('USER-OPTIONS') private userOptions: UserOptions
    ) {}

    findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
        return this.userRepository.findOne(findData);
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({
            where: { Email: email },
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

        const checkIfUserExist = await this.getUserByEmail(userRegisterDto.email);
        if (checkIfUserExist != null) {
            throw new HttpException(
                `User already exist with the email: ${userRegisterDto.email}`,
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            const user = this.userRepository.create({
                ...userRegisterDto.mapToUserEntity(),
                EmailVerificationToken: this.userOptions.EmailConfirmationRequired
                    ? UtilService.GenerateUUID().replace("-", "")
                    : null,
                EmailConfirmed: !this.userOptions.EmailConfirmationRequired,
                LockoutEnabled: this.userOptions.EnableLockoutForNewUsers,
                UserName: UtilService.GenerateUUID().replace("-", "")
                    .substring(0, 11),
                PasswordHash: EncryptionService.generateHash(userRegisterDto.password),
            });

            const savedUser = await this.userRepository.save(user);
            if (this.userOptions.EmailConfirmationRequired) {
                await this.sendUserEmailVerification(savedUser.Email, savedUser.EmailVerificationToken);
            }

            return user;
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async hasUserVerifiedEmail(user: UserEntity): Promise<boolean>{
        return user.EmailConfirmed;
    }

    async getAccessFailedCount(user: UserEntity): Promise<number>{
        return user.AccessFailedCount;
    }

    async processUserAccountLock(user: UserEntity) {
        ++user.AccessFailedCount;
        if (user.AccessFailedCount == this.userOptions.LockoutAccessCount) {
            user.LockoutEndDateUtc = (new Date()).addMinutes(this.userOptions.LockoutExpiryMinute);
        }
        await this.userRepository.save(user);
    }

    async sendUserEmailVerification(email: string, token?: string) {
        try {
            const emailtoken = token ? token : UtilService.GenerateUUID();
            const emailbody = `Hi! <br><br> Thanks for your registration<br><br><a href='http://localhost:5100/api/auth/email/verify/${emailtoken}'>Click here to activate your account</a>`
            const emailResponse = await this.emailSenderService.SendEmail(email, 'Testing Nest MailerModule ✔', emailbody);
        }catch(error){
            console.log(error);
        }
    }

    async verifyEmail(email: string, token: string) : Promise<ServiceResponse<string>> {
        const checkIfUserExist = await this.getUserByEmail(email);
        if (checkIfUserExist == null) {
            return ServiceResponseInterface.getServiceResponse<string>(
                null,
                "Sorry, we can not verify the email at the moment. Try again later.",
                true,
                HttpStatus.BAD_REQUEST);
        }

        if (checkIfUserExist.EmailConfirmed) {
            return ServiceResponseInterface.getServiceResponse<string>(
                null,
                `Sorry, account linked with this email (${email}) has been verified already\``,
                true,
                HttpStatus.BAD_REQUEST);
        }

        if (checkIfUserExist.EmailVerificationToken != token) {
            return ServiceResponseInterface.getServiceResponse<string>(
                null,
                `Sorry, we can not verify the email due to bad verification data, please request for a new verification.`,
                true,
                HttpStatus.BAD_REQUEST);
        }

        checkIfUserExist.EmailConfirmed = true;
        await this.userRepository.save(checkIfUserExist);
        return ServiceResponseInterface.getServiceResponse<string>(
            "Email verified successfully",
            "",
            false,
            HttpStatus.OK);
    }

    async updateUserEmail(email: string) : Promise<string> {
        const checkIfUserExist = await this.getUserByEmail(email);
        if (checkIfUserExist == null) {
            throw new BadRequestException("Sorry, we can not update the email at the moment. Try again later.")
        }

        checkIfUserExist.EmailVerificationToken = UtilService.GenerateUUID().replace("-", "");
        checkIfUserExist.EmailConfirmed = false;
        this.userRepository.save(checkIfUserExist);

        await this.sendUserEmailVerification(checkIfUserExist.Email, checkIfUserExist.EmailVerificationToken);
        return "Email verified successfully";
    }

    async requestEmailVerification(email: string) : Promise<ServiceResponse<string>>{
        const checkIfUserExist = await this.getUserByEmail(email);
        if (checkIfUserExist == null) {
            return ServiceResponseInterface.getServiceResponse<string>(
                null,
                `Sorry, we can not update the email at the moment. Try again later.`,
                true,
                HttpStatus.BAD_REQUEST);
        }

        checkIfUserExist.EmailVerificationToken = UtilService.GenerateUUID().replace("-", "");
        checkIfUserExist.EmailConfirmed = false;
        await this.userRepository.save(checkIfUserExist);

        await this.sendUserEmailVerification(checkIfUserExist.Email, checkIfUserExist.EmailVerificationToken);
        return ServiceResponseInterface.getServiceResponse<string>(
            "Email verified successfully",
            "",
            false,
            HttpStatus.OK);
    }
}
