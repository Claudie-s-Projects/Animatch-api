  import { IsIn } from 'class-validator';

  export class UpdateStatutDto {
    @IsIn(['validée', 'déclinée'])
    statut: string;
  }