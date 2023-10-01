import { Ticket } from 'src/tickets/entities/ticket.entity';
import { Train } from 'src/train/entities/train.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Travel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  time_departure: Date;

  @Column({ type: 'timestamptz' })
  time_arrival: Date;

  @Column()
  place_departure: string;

  @Column()
  place_arrival: string;

  @Column()
  duration: string;

  @ManyToOne(() => Train, (train) => train.travel)
  @JoinColumn()
  train: Train;

  @OneToOne(() => Ticket, (ticket) => ticket.travel)
  @JoinColumn()
  ticket: Ticket;
}
