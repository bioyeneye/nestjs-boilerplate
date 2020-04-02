import {EventSubscriber, EntitySubscriberInterface, InsertEvent} from "typeorm";
import { User } from "../entities/user.entity";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    beforeInsert(event: InsertEvent<User>) {
        console.log(`BEFORE user INSERTED: `, event.entity);
    }

    afterInsert(event: InsertEvent<User>) {
        console.log(`After user INSERTED: `, event.entity);
    }
}
