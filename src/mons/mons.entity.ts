import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column()
  names: string;

  @Column()
  image: string;
}