import {Entity, Column, OneToMany, ManyToOne} from "typeorm";
import {BaseDateWithUpdateModel} from "./base/base-datewithupdate.model";
import {AuditTrail} from "./audittrail.entity";
import {AuditSection} from "./auditsection.entity";
import {BaseDateModel} from "./base/base-date.model";


@Entity({name: 'AuditActions'})
export class AuditAction extends BaseDateModel {

    @Column()
    Name: string;

    @Column()
    SectionId: number;

    @OneToMany(type => AuditTrail, audittrail => audittrail.AuditAction)
    AuditTrails: AuditTrail[];

    @ManyToOne(type => AuditSection)
    AuditSection: AuditSection;
}