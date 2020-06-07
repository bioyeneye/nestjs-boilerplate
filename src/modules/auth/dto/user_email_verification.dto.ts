import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserEmailVerificationDto {
    @IsString()
    @IsEmail({}, {message: "Ensure the email supplied is valid"})
    @IsNotEmpty({message: "Email address is required"})
    @ApiProperty()
    readonly email: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty({message: "Email verification token is required for verification"})
    readonly token: string;
}

export class UserRequestEmailVerificationDto {
    @IsString()
    @IsEmail({}, {message: "Ensure the email supplied is valid"})
    @IsNotEmpty({message: "Email address is required"})
    @ApiProperty()
    readonly email: string;
}