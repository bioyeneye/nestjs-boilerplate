import {Global, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {entityrepositories} from "./index";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([...entityrepositories]),
    ],
    exports: [
        TypeOrmModule.forFeature([...entityrepositories]),
    ]
})
export class ApplicationRepositoryModule {

}