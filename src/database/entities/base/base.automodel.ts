import {BaseEntity, PrimaryGeneratedColumn} from "typeorm";

export class BaseAutoModel{
    @PrimaryGeneratedColumn("uuid")
    Id: string;
}