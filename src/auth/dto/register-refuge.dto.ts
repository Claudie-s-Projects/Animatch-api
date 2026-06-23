import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterRefugeDto {
  @IsString() nom: string;
  @IsEmail() email: string;
  @IsString() @MinLength(8) mot_de_passe: string;
  @IsString() adresse: string;
  @IsString() localite: string;
}
