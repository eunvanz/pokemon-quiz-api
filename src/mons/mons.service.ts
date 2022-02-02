import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Mon } from './mons.entity';

@Injectable()
export class MonsService {
  constructor(
    @InjectRepository(Mon)
    private readonly monsRepository: Repository<Mon>,
  ) {}

  async generateMons() {
    Array.from({ length: 898 }).reduce(async (prev, _, index) => {
      await prev;
      const { data: monData } = await axios.get<any>(
        `https://pokeapi.co/api/v2/pokemon/${index + 1}`,
      );
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${monData.id}`,
      );
      const mon = {
        id: monData.id,
        names: data.names.map((name) => name.name).join(','),
        image: monData.sprites.other['official-artwork'].front_default,
      };
      console.info('::::: Successfully generated', mon);
      await this.monsRepository.save(mon);
    }, Promise);
  }

  async getAllMons() {
    return await this.monsRepository.find();
  }
}
