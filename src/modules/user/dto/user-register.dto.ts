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

const passwordRequirement: PasswordValidationRequirement = {
    mustContainLowerLetter: true,
    mustContainNumber: true,
    mustContainSpecialCharacter: true,
    mustContainUpperLetter: true
}

export class UserRegisterDto {
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
}
