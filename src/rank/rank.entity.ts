import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rank {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  countryCode?: string;

  @Column({ nullable: true })
  ip?: string;

  @Column()
  generation: number;

  @Column()
  score: number;

  @Column()
  gotcha: number;

  @Column()
  maxCombo: number;

  @Column('double')
  avgSpeed: number;

  @Column('double')
  maxSpeed: number;

  @Column('double')
  accuracy: number;

  @Column('text', { nullable: true })
  gotchaMons: string;
}
