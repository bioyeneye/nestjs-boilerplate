import {Entity, Column, OneToMany} from "typeorm";
import {BaseDateWithUpdateModel} from "./base/base-datewithupdate.model";
import {AuditTrail} from "./audittrail.entity";
import {AuditAction} from "./auditaction.entity";
import {BaseDateModel} from "./base/base-date.model";


@Entity({name: 'AuditSections'})
export class AuditSection extends BaseDateModel {

    @Column()
    Name: string;

    @OneToMany(type => AuditAction, auditaction => auditaction.AuditSection)
    AuditActions: AuditAction[];
}