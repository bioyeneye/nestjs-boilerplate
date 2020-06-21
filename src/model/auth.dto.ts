import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {UserDto} from "./user.dto";


export class TokenPayloadDto {
    @ApiProperty()
    expiresIn: number;

    @ApiProperty()
    accessToken: string;

    constructor(data: { expiresIn: number; accessToken: string }) {
        this.expiresIn = data.expiresIn;
        this.accessToken = data.accessToken;
    }
}

export class LoginPayloadDto {
    @ApiProperty({ type: UserDto })
    user: UserDto;
    @ApiProperty({ type: TokenPayloadDto })
    token: TokenPayloadDto;

    constructor(user: UserDto, token: TokenPayloadDto) {
        this.user = user;
        this.token = token;
    }
}

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

export class UserLoginDto {
    @IsString()
    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @ApiProperty()
    readonly password: string;
}