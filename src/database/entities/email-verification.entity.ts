import { Entity, Column, ManyToOne } from "typeorm";
import { BaseDateWithUpdateModel } from "./base/base-datewithupdate.model";
import { BaseDateModel } from "./base/base-date.model";
import { UserEntity } from "./user.entity";

@Entity({name: 'emailverifications'})
export class EmailVerificationEntity extends BaseDateModel {

    @Column()
    emailtoken: string;

    @ManyToOne(type => UserEntity, user => user.EmailVerifications)
    user: UserEntity;
}
