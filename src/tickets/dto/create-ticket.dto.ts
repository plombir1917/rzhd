import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateTicketDto {
  @IsPositive()
  @IsNotEmpty()
  cost: number;

  @IsPositive()
  @IsNotEmpty()
  quantity: number;
}
