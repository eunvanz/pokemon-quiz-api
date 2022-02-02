import { Controller, Get, Post } from '@nestjs/common';
import { MonsService } from './mons.service';

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
}
