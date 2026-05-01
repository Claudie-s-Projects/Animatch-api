export class FindAnimalsDto {
  page = 1;
  limit = 20;
  espece?: string;
  sexe?: string;
  ville?: string;
  urgence?: 'prioritaire' | 'urgent' | 'critique';
}
