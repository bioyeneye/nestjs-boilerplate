import { Entity, Column } from "typeorm";
import { BaseDateModel } from "./base/BaseDateModel";

@Entity()
export class User extends BaseDateModel {

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;
}
