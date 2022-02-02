import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Mon {
  @PrimaryColumn()
  id: number;

  @Column()
  names: string;

  @Column()
  image: string;
}
