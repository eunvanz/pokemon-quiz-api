import { IsArray } from 'class-validator';

export class UpdateMonCountDto {
  @IsArray()
  result: {
    id: number;
    isGotten: boolean;
  }[];
}
