import { BaseAutoModel } from "./base.automodel";
import { BeforeInsert, Column, BeforeUpdate } from "typeorm";

export class BaseDateWithUpdateModel extends BaseAutoModel{
    
    @Column()
    CreatedDate: Date;

    @Column({nullable: true})
    UpdatedDate?: Date;
    
    @BeforeInsert()
    updateDatesBeforeInsert() {
        this.CreatedDate = new Date();
    }

    @BeforeUpdate()
    updateDatesBeforeUpdate() {
        this.UpdatedDate = new Date();
    }
}