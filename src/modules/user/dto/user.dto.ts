import { ApiPropertyOptional } from "@nestjs/swagger";
import { UserEntity } from "src/database/entities/user.entity";

export class UserDto {
    
    @ApiPropertyOptional()
    id: string;

    @ApiPropertyOptional()
    firstName: string;

    @ApiPropertyOptional()
    lastName: string;

    @ApiPropertyOptional()
    userName: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    phoneNumber: string;

    constructor(user: UserEntity) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.userName = user.userName;
    }
}