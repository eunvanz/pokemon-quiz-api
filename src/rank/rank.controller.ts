import { Body, Controller, Post } from '@nestjs/common';
import { RankService } from './rank.service';
import { CreateRankDto } from './dto/create-rank-dto';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Post()
  async save(@Body() createRankDto: CreateRankDto) {
    return await this.rankService.save(createRankDto);
  }
}
