
import { IsIn, IsOptional } from 'class-validator';

 export const LOGEMENT_OPTIONS = ['Maison avec jardin',
         'Maison sans jardin', 'Appartement avec balcon', 'Appartement sans balcon', 'Autre'] as const;
export const ENFANTS_OPTIONS = ['Aucun', 'Enfants < 5 ans', 'Enfants 6–12 ans', 'Enfants 13+ ans'] as const;
export const ANIMAUX_OPTIONS = ['Aucun', 'Chien', 'Chat', 'Autre animal', 'Plusieurs animaux'] as const;
export const ACTIVITE_OPTIONS = ['Sédentaire', 'Modérément actif', 'Très actif'] as const;
export const EXPERIENCE_OPTIONS = ['Aucune', 'Débutant', 'Expérimenté', 'Expert'] as const;
       
export class UpdateProfileDto {
  @IsOptional()  @IsIn(LOGEMENT_OPTIONS) logement?: string;
  @IsOptional() @IsIn(ENFANTS_OPTIONS)  enfants?: string;
  @IsOptional() @IsIn(ANIMAUX_OPTIONS) animaux?: string;
  @IsOptional() @IsIn(ACTIVITE_OPTIONS) activite?: string;
  @IsOptional() @IsIn(EXPERIENCE_OPTIONS)  experience?: string;
}
