import { Entity, Column, ManyToOne } from "typeorm";
import { BaseDateWithUpdateModel } from "./base/base-datewithupdate.model";
import { BaseDateModel } from "./base/base-date.model";
import { UserEntity } from "./user.entity";

@Entity({name: 'SmsVerifications'})
export class SmsVerificationEntity extends BaseDateModel {

    @Column()
    SmsToken: string;

    @ManyToOne(type => UserEntity, user => user.SmsVerifications)
    User: UserEntity;
}
