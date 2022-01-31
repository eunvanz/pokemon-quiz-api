import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mon } from './mons.entity';

@Injectable()
export class MonsService {
  constructor(
    @InjectRepository(Mon)
    private readonly monsRepository: Repository<Mon>,
  ) {}
}
