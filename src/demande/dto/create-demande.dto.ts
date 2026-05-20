import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDemandeDto {
  @IsInt()
  animalId: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  message?: string;
}
