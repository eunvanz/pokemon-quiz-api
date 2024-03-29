import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonsModule } from './mons/mons.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { RankModule } from './rank/rank.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    MonsModule,
    RankModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
