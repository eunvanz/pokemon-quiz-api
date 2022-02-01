import { Controller, Post } from '@nestjs/common';
import { MonsService } from './mons.service';

@Controller('mons')
export class MonsController {
  constructor(private readonly monsService: MonsService) {}

  @Post('generate')
  async generateMons() {
    return await this.monsService.generateMons();
  }
}
