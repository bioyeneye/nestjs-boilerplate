import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule.forRoot(), DatabaseModule.forRoot()],
})
export class AppModule {}
