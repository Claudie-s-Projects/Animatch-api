import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAnimalsDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) limit = 20;

  @IsOptional() @IsString() espece?: string;
  @IsOptional() @IsString() sexe?: string;
  @IsOptional() @IsString() ville?: string;

  @IsOptional() @IsIn(['prioritaire', 'urgent', 'critique'])
  urgence?: 'prioritaire' | 'urgent' | 'critique';
}
