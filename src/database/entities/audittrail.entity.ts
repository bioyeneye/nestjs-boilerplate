import {Entity, Column, ManyToOne} from "typeorm";
import {AuditAction} from "./auditaction.entity";
import {UserEntity} from "./user.entity";
import {BaseDateModel} from "./base/base-date.model";


@Entity({name: 'AuditTrails'})
export class AuditTrail extends BaseDateModel {

    @Column({nullable: true})
    UserIp: string;

    @Column({nullable: true})
    Details: string

    @Column()
    TimeStamp: Date;

    /*@Column()
    AuditActionId: string;*/

    @Column()
    IsMobile: boolean

    @Column({nullable: true})
    BrowserName: string;

    @Column()
    UserId: number;

    @ManyToOne(type => AuditAction)
    AuditAction: AuditAction;

    @ManyToOne(type => UserEntity, user => user.AuditTrails)
    User: UserEntity;
}