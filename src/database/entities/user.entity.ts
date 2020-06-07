import { Entity, Column, OneToMany } from "typeorm";
import { BaseDateWithUpdateModel } from "./base/base-datewithupdate.model";
import { EmailVerificationEntity } from "./email-verification.entity";
import { SmsVerificationEntity } from "./sms-verification.entity";
import {RoleType} from "../../shared/constants/role-type";
import {AuditTrail} from "./audittrail.entity";

@Entity({name: 'Users'})
export class UserEntity extends BaseDateWithUpdateModel {

    @Column()
    UserName: string;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    PhoneNumber: string;

    @Column({ default: false })
    PhoneNumberConfirmed: boolean;

    @Column({ name: 'email', unique: true })
    Email!: string;

    @Column({ default: false })
    EmailConfirmed: boolean;

    @Column()
    PasswordHash: string;

    @Column({nullable: true})
    PhoneNumberVerificationCode?: string;

    @Column({nullable: true})
    EmailVerificationToken?: string;

    @Column({nullable: true})
    DOB?: Date;

    @Column({default: false})
    LockoutEnabled:	boolean;

    @Column({nullable: true})
    LockoutEndDateUtc?: Date;

    @Column({default: 0})
    AccessFailedCount:	number

    @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
    Role: RoleType;

    @OneToMany(type => EmailVerificationEntity, email => email.User)
    EmailVerifications: EmailVerificationEntity[];

    @OneToMany(type => SmsVerificationEntity, sms => sms.User)
    SmsVerifications: SmsVerificationEntity[];

    @OneToMany(type => AuditTrail, trail => trail.User)
    AuditTrails: AuditTrail[];
}
