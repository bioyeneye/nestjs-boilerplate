import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {RoleType} from "../shared/constants/role-type";
import {UserEntity} from "../database/entities/user.entity";
import {PasswordValidation, PasswordValidationRequirement} from "class-validator-password-check";
import {IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, Validate} from "class-validator";
import {Column} from "typeorm";

export class UserDto {

    @ApiPropertyOptional()
    Id: string;

    @ApiPropertyOptional()
    FirstName: string;

    @ApiPropertyOptional()
    LastName: string;

    @ApiPropertyOptional()
    UserName: string;

    @ApiPropertyOptional()
    Email: string;

    @ApiPropertyOptional()
    PhoneNumber: string;

    @ApiPropertyOptional()
    Role: RoleType;


    constructor(user: UserEntity) {
        this.FirstName = user.FirstName;
        this.LastName = user.LastName;
        this.Email = user.Email;
        this.PhoneNumber = user.PhoneNumber;
        this.UserName = user.UserName;
        //this.Role = user.Role;
    }
}

const passwordRequirement: PasswordValidationRequirement = {
    mustContainLowerLetter: true,
    mustContainNumber: true,
    mustContainSpecialCharacter: true,
    mustContainUpperLetter: true
};

export class UserRegisterDto {

    constructor(){
    }

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly lastName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @ApiProperty({ minLength: 6, maxLength: 20})
    @Validate(PasswordValidation, [passwordRequirement])
    readonly password: string;

    @Column()
    @IsOptional()
    @ApiProperty()
    phoneNumber: string;

    public mapToUserEntity() : UserEntity {
        return new UserEntity({
            FirstName: this.firstName,
            PhoneNumber: this.phoneNumber,
            LastName: this.lastName,
            Email: this.email
        });
    }
}
