import { Entity, Column } from "typeorm";
import { BaseDateModel } from "./base/base.datemodel";

@Entity({name: 'users'})
export class UserEntity extends BaseDateModel {

    @Column()
    userName: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

    @Column({ default: false })
    phoneNumberConfirmed: boolean;

    @Column({ name: 'email', unique: true })
    email!: string;

    @Column({ default: false })
    emailConfirmed: boolean;

    @Column()
    passwordHash: string;
}
