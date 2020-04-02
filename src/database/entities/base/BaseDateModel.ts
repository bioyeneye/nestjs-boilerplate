import { BaseAutoModel } from "./BaseAutoModel";
import { BeforeInsert, Column, BeforeUpdate } from "typeorm";

export class BaseDateModel extends BaseAutoModel{
    
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