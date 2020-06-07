import {ApiPropertyOptional} from "@nestjs/swagger";
import {UserEntity} from "src/database/entities/user.entity";
import {RoleType} from "../../../shared/constants/role-type";

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
        this.Role = user.Role;
    }
}