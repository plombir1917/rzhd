import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrainDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
