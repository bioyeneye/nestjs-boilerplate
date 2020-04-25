import { BaseAutoModel } from "./base.automodel";
import { BeforeInsert, Column, BeforeUpdate } from "typeorm";

export class BaseDateWithUpdateModel extends BaseAutoModel{
    
    @Column()
    createdDate: Date;

    @Column({nullable: true})
    updatedDate?: Date;
    
    @BeforeInsert()
    updateDatesBeforeInsert() {
        this.createdDate = new Date();
    }

    @BeforeUpdate()
    updateDatesBeforeUpdate() {
        this.updatedDate = new Date();
    }
}