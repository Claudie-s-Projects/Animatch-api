import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString() prenom: string;
  @IsString() nom: string;
  @IsEmail() email: string;
  @IsString() @MinLength(8) mot_de_passe: string;
}
