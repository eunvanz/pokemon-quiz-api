import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rank } from './rank.entity';
import { MoreThanOrEqual, Not, Repository, createQueryBuilder } from 'typeorm';
import { CreateRankDto } from './dto/create-rank-dto';
import { IPaginationOptions, paginateRaw } from 'nestjs-typeorm-paginate';
import { camelizeKeys } from 'humps';

@Injectable()
export class RankService {
  constructor(
    @InjectRepository(Rank)
    private readonly rankRepository: Repository<Rank>,
  ) {}

  async save(createRankDto: CreateRankDto) {
    const count = await this.rankRepository.count({
      score: MoreThanOrEqual(createRankDto.score),
    });
    const result = await this.rankRepository.save({
      ...createRankDto,
      gotchaMons: createRankDto.gotchaMons.join(','),
    });
    return {
      ...result,
      gotchaMons: result.gotchaMons.split(',').map(Number),
      seq: count + 1,
    };
  }

  async findOne(id: number) {
    const result = await this.rankRepository.findOne(id);
    if (!result) {
      throw new NotFoundException();
    }
    const count = await this.rankRepository.count({
      score: MoreThanOrEqual(result.score),
      id: Not(result.id),
    });
    return {
      ...result,
      gotchaMons: result.gotchaMons.split(',').map(Number),
      seq: count + 1,
    };
  }

  async getRankList({
    name,
    country,
    generation,
    ...pageOptions
  }: IPaginationOptions & {
    name?: string;
    country?: string;
    generation: number;
  }) {
    const queryBuilder = createQueryBuilder()
      .select('b.*')
      .from(
        (qb) =>
          qb
            .select('a.*')
            .addSelect('RANK() OVER(ORDER BY score DESC)', 'seq')
            .from(Rank, 'a'),
        'b',
      )
      .orderBy('seq', 'ASC');

    console.log('===== generation', generation);
    if (name?.trim()) {
      queryBuilder.andWhere('UPPER(b.name) like UPPER(:name)', {
        name: `%${name}%`,
      });
    }

    if (country?.trim()) {
      queryBuilder.andWhere('UPPER(b.country) like UPPER(:country)', {
        country: `%${country}%`,
      });
    }

    if (generation > -1) {
      queryBuilder.andWhere('b.generation = :generation', {
        generation,
      });
    }

    const rawResult = await paginateRaw(queryBuilder, pageOptions);
    const enhancedItems = rawResult.items.map((item) => {
      const camelizedItem = camelizeKeys(item);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return {
        ...camelizedItem,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        gotchaMons: camelizedItem.gotchaMons?.split(',').map(Number),
      };
    });
    return { ...rawResult, items: enhancedItems };
  }
}
