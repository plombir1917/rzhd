import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketsService } from 'src/tickets/tickets.service';
import { TrainService } from 'src/train/train.service';
import { Repository } from 'typeorm';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travel } from './entities/travel.entity';

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(Travel) private travelRepository: Repository<Travel>,
    private readonly ticketsService: TicketsService,
    private readonly trainService: TrainService,
  ) {}

  async buy(id: number) {
    const travel = await this.findOne(id);
    return this.ticketsService.buy(travel.ticket);
  }

  async create(createTravelDto: CreateTravelDto) {
    const ticket = await this.ticketsService.findOne(createTravelDto.ticketId);
    const train = await this.trainService.findOne(createTravelDto.trainId);
    const newTravel = this.travelRepository.create({
      ...createTravelDto,
      ticket,
      train,
    });
    return this.travelRepository.save(newTravel);
  }

  async findAll() {
    const travels = await this.travelRepository.find();
    if (!travels.length) {
      throw new NotFoundException('Рейс не найден!');
    }
    return travels;
  }

  async findOne(id: number) {
    const travel = await this.travelRepository.findOne({
      where: { id: id },
      relations: { ticket: true, train: true },
    });
    if (!travel) {
      throw new NotFoundException('Рейс не найден!');
    }
    return travel;
  }

  async update(id: number, updateTravelDto: UpdateTravelDto) {
    const travel = await this.findOne(id);
    return this.travelRepository.save({ ...travel, ...updateTravelDto });
  }

  async remove(id: number) {
    const travel = await this.findOne(id);
    return travel;
  }
}
