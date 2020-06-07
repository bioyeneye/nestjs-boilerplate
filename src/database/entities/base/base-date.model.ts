import { BaseAutoModel } from "./base.automodel";
import { BeforeInsert, Column, BeforeUpdate } from "typeorm";

export class BaseDateModel extends BaseAutoModel{
    
    @Column()
    CreatedDate: Date;
    
    @BeforeInsert()
    updateDatesBeforeInsert() {
        this.CreatedDate = new Date();
    }
}