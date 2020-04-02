import { PrimaryGeneratedColumn } from "typeorm";

export class BaseAutoModel{
    @PrimaryGeneratedColumn("uuid")
    id: string;
}