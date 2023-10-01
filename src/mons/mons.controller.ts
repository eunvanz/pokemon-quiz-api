import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { MonsService } from './mons.service';
import { UpdateMonCountDto } from './dto/update-mon-count-dto';

@Controller('mons')
export class MonsController {
  constructor(private readonly monsService: MonsService) {}

  @Post('generate')
  async generateMons() {
    return await this.monsService.generateMons();
  }

  @Get()
  async getAllMons() {
    return await this.monsService.getAllMons();
  }

  @Patch('count')
  async patchMonCounts(@Body() updateMonCountDto: UpdateMonCountDto) {
    return await this.monsService.patchMonCounts(updateMonCountDto);
  }
}
