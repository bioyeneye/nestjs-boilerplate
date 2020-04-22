import {EventSubscriber, EntitySubscriberInterface, InsertEvent} from "typeorm";
import { UserEntity } from "../entities/user.entity";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {

    listenTo() {
        return UserEntity;
    }

    beforeInsert(event: InsertEvent<UserEntity>) {
        console.log(`BEFORE user INSERTED: `, event.entity);
    }

    afterInsert(event: InsertEvent<UserEntity>) {
        console.log(`After user INSERTED: `, event.entity);
    }
}
