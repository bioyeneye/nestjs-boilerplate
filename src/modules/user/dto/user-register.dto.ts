import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MinLength,
    Matches,
    MaxLength,
    Validate,
} from 'class-validator';
import { Column } from 'typeorm';
import { PasswordValidation, PasswordValidationRequirement } from 'class-validator-password-check'
import {UserEntity} from "../../../database/entities/user.entity";

const passwordRequirement: PasswordValidationRequirement = {
    mustContainLowerLetter: true,
    mustContainNumber: true,
    mustContainSpecialCharacter: true,
    mustContainUpperLetter: true
}

export class UserRegisterDto {

    constructor(){
        //this.mapToUserEntity = this.mapToUserEntity.bind(this);
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
