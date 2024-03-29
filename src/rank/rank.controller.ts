import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
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
    @Query('limit', new DefaultValuePipe(30), ParseIntPipe) limit = 30,
    @Query('name') name?: string,
    @Query('country') country?: string,
    @Query('generation', new DefaultValuePipe(-1), ParseIntPipe)
    generation = -1,
    @Query('isUniqueName', new DefaultValuePipe(true), ParseBoolPipe)
    isUniqueName = true,
  ) {
    return await this.rankService.getRankList({
      page,
      limit,
      name,
      country,
      generation,
      isUniqueName,
    });
  }
}
