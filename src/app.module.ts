import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonsModule } from './mons/mons.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    MonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
