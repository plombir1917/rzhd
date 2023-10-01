import { Travel } from 'src/travel/entities/travel.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cost: number;

  @Column()
  quantity: number;

  @OneToOne(() => Travel, (travel) => travel.ticket)
  travel: Travel;
}
