import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional() @IsString() logement?: string;
  @IsOptional() @IsString() enfants?: string;
  @IsOptional() @IsString() animaux?: string;
  @IsOptional() @IsString() activite?: string;
  @IsOptional() @IsString() experience?: string;
}
