import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTravelDto {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  time_departure: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  time_arrival: Date;

  @IsString()
  @IsNotEmpty()
  place_departure: string;

  @IsString()
  @IsNotEmpty()
  place_arrival: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNumber()
  @IsNotEmpty()
  trainId: number;

  @IsNumber()
  @IsNotEmpty()
  ticketId: number;
}
