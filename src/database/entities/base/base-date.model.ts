import { BaseAutoModel } from "./base.automodel";
import { BeforeInsert, Column, BeforeUpdate } from "typeorm";

export class BaseDateModel extends BaseAutoModel{
    
    @Column()
    createdDate: Date;
    
    @BeforeInsert()
    updateDatesBeforeInsert() {
        this.createdDate = new Date();
    }
}