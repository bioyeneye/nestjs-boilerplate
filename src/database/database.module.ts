import { Module, DynamicModule } from '@nestjs/common';
import { subscribers } from './subscribers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forRoot()],
    providers: [],
    exports: []
})
export class DatabaseModule {
    static forRoot(): DynamicModule{
        const providers: any[] = [].concat(subscribers)
        return {
            module: DatabaseModule,
            providers: providers,
            exports: providers
        }
    }
}
