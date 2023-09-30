import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RankService } from './rank.service';
import { CreateRankDto } from './dto/create-rank-dto';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Post()
  async save(@Body() createRankDto: CreateRankDto) {
    return await this.rankService.save(createRankDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.rankService.findOne(id);
  }

  @Get()
  async getRankList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20,
  ) {
    return await this.rankService.getRankList({ page, limit });
  }
}
