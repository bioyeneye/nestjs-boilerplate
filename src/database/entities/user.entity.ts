import { Entity, Column, OneToMany } from "typeorm";
import { BaseDateWithUpdateModel } from "./base/base-datewithupdate.model";
import { EmailVerificationEntity } from "./email-verification.entity";
import { SmsVerificationEntity } from "./sms-verification.entity";

@Entity({name: 'users'})
export class UserEntity extends BaseDateWithUpdateModel {

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

    @Column({nullable: true})
    phonenumberverificationcode?: string;

    @Column({nullable: true})
    emailverificationtoke?: string;

    @Column({nullable: true})
    dob?: Date

    @Column({default: false})
    accountLock?: boolean;

    @OneToMany(type => EmailVerificationEntity, email => email.user)
    EmailVerifications: EmailVerificationEntity[];

    @OneToMany(type => SmsVerificationEntity, sms => sms.user)
    SmsVerifications: SmsVerificationEntity[];
    
}
