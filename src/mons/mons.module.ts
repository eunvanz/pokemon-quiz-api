import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonsController } from './mons.controller';
import { Mon } from './mons.entity';
import { MonsService } from './mons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mon])],
  controllers: [MonsController],
  providers: [MonsService],
})
export class MonsModule {}
