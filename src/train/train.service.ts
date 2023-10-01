import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { Train } from './entities/train.entity';

@Injectable()
export class TrainService {
  constructor(
    @InjectRepository(Train) private trainRepository: Repository<Train>,
  ) {}
  create(createTrainDto: CreateTrainDto) {
    const newTrain = this.trainRepository.create(createTrainDto);
    return this.trainRepository.save(newTrain);
  }

  async findAll() {
    const trains = await this.trainRepository.find();
    if (!trains.length) {
      throw new NotFoundException('Поезд не найден');
    }
    return trains;
  }

  async findOne(id: number) {
    const train = await this.trainRepository.findOneBy({ id });
    if (!train) {
      throw new NotFoundException('Поезд не найден');
    }
    return train;
  }

  async update(id: number, updateTrainDto: UpdateTrainDto) {
    const train = await this.findOne(id);
    return this.trainRepository.save({ ...train, ...updateTrainDto });
  }

  async remove(id: number) {
    const train = await this.findOne(id);
    return this.trainRepository.remove(train);
  }
}
