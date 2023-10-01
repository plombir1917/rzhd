import { Travel } from 'src/travel/entities/travel.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Train {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @OneToMany(() => Travel, (travel) => travel.train)
  travel: Travel[];
}
