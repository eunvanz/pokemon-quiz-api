import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonsModule } from './mons/mons.module';

@Module({
  imports: [MonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
