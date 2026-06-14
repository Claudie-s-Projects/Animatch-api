import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom, timeout } from 'rxjs';
import { Animal } from '../animal/animal.entity';

@Injectable()
export class MatchService {
  private readonly apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
 private readonly model ='openai/gpt-oss-120b:free';

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
    @InjectRepository(Animal) private readonly animals: Repository<Animal>,
  ) {}

  async match(famille: {
    logement: string;
    enfants: string;
    animaux: string;
    activite: string;
    experience: string;
     espece: string;
  }) {
    const animaux = await this.animals.find({
      where: { disponible: true, espece: famille.espece },
      select: ['id', 'nom', 'espece', 'race', 'age', 'sexe', 'description','photo_url'],
      take: 40,
    });

    const listeAnimaux = animaux
      .map(a => `- ID ${a.id} | ${a.nom} | ${a.espece ?? '?'} | ${a.race ?? '?'} | ${a.age ?? '?'} | ${a.sexe ?? '?'} | Description : ${a.description ?? 'aucune'}`)
      .join('\n');

    const prompt = `Tu es un conseiller bienveillant spécialisé dans l'adoption animale. Tu connais bien les besoins des animaux et les réalités du quotidien des familles. Ta mission est d'aider cette famille à trouver l'animal qui correspond vraiment à leur mode de vie, pour que l'adoption soit une réussite pour tout le monde.

Voici le profil de la famille :
- Type de logement : ${famille.logement}
- Présence d'enfants : ${famille.enfants}
- Animaux déjà présents à la maison : ${famille.animaux}
- Mode de vie : ${famille.activite}
- Expérience avec les animaux : ${famille.experience}

Voici les animaux actuellement disponibles à l'adoption :
${listeAnimaux}

En tenant compte du profil de cette famille, sélectionne les 5 animaux qui leur correspondent le mieux. Pour chaque animal choisi, rédige une explication chaleureuse et personnalisée (2-3 phrases) qui explique pourquoi cet animal est adapté à leur situation.

Réponds UNIQUEMENT avec un tableau JSON valide, sans texte avant ni après, au format suivant :
[
  { "id": 1, "explication": "..." },
  { "id": 2, "explication": "..." },
  { "id": 3, "explication": "..." },
    { "id": 4, "explication": "..." },
    { "id": 5, "explication": "..." }
]`;

    const response = await firstValueFrom(
      this.http
        .post(
          this.apiUrl,
          {
            model: this.model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.6,
            max_tokens: 1000,
          },
          {
            headers: {
              Authorization: `Bearer ${this.config.get<string>('OPENROUTER_API_KEY')}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(timeout(30000)),
    );

    const content = response.data.choices[0]?.message?.content ?? '[]';
    const resultats = JSON.parse(content);

    return resultats.map((r: { id: number; explication: string }) => ({
      ...animaux.find(a => a.id === r.id),
      explication: r.explication,
    }));
  }
}
