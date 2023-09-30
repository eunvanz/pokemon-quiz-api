import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRankDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  countryCode?: string;

  @IsNumber()
  generation: number;

  @IsNumber()
  score: number;

  @IsNumber()
  gotcha: number;

  @IsNumber()
  maxCombo: number;

  @IsNumber()
  avgSpeed: number;

  @IsNumber()
  maxSpeed: number;

  @IsNumber()
  accuracy: number;
}
