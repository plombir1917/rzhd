import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travel } from './entities/travel.entity';
import { TrainModule } from 'src/train/train.module';
import { TicketsModule } from 'src/tickets/tickets.module';

@Module({
  imports: [TypeOrmModule.forFeature([Travel]), TrainModule, TicketsModule],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
