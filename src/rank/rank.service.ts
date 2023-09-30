import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rank } from './rank.entity';
import { Repository } from 'typeorm';
import { CreateRankDto } from './dto/create-rank-dto';

@Injectable()
export class RankService {
  constructor(
    @InjectRepository(Rank)
    private readonly rankRepository: Repository<Rank>,
  ) {}

  async save(createRankDto: CreateRankDto) {
    return await this.rankRepository.save(createRankDto);
  }
}
