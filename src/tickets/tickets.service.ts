import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}
  async buy(ticket: Ticket) {
    ticket.quantity--;
    return this.update(ticket.id, ticket);
  }

  create(createTicketDto: CreateTicketDto) {
    const newTicket = this.ticketRepository.create(createTicketDto);
    return this.ticketRepository.save(newTicket);
  }

  async findAll() {
    const tickets = await this.ticketRepository.find();
    if (!tickets.length) {
      throw new NotFoundException('Билеты не найдены');
    }
    return tickets;
  }

  async findOne(id: number) {
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException('Билеты не найдены');
    }
    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.findOne(id);
    return this.ticketRepository.save({ ...ticket, ...updateTicketDto });
  }

  async remove(id: number) {
    const ticket = await this.findOne(id);
    return this.ticketRepository.remove(ticket);
  }
}
