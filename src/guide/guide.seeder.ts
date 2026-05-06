import { DataSource } from 'typeorm';
import { Guide } from './guide.entity';

const guides = [
  {
    titre: 'Préparer l\'arrivée de votre chien',
    slug: 'preparer-arrivee-chien',
    espece: 'Chien',
    thematique: 'preparation',
    contenu: `Avant d'accueillir votre nouveau chien, préparez un espace dédié avec un panier, des gamelles et des jouets. Sécurisez les zones dangereuses (câbles, produits ménagers) et installez une clôture si vous avez un jardin.

Prévoyez un rendez-vous vétérinaire dans les premiers jours pour un bilan de santé complet. Demandez au refuge les antécédents médicaux et le carnet de vaccination.

Les premiers jours, laissez l'animal explorer à son rythme. Évitez les visites nombreuses qui pourraient le stresser. La routine est essentielle : repas, promenades et coucher à heures fixes.`,
  },
  {
    titre: 'Préparer l\'arrivée de votre chat',
    slug: 'preparer-arrivee-chat',
    espece: 'Chat',
    thematique: 'preparation',
    contenu: `Installez un bac à litière dans un endroit calme et accessible, loin des gamelles. Prévoyez un griffoir, un arbre à chat et des cachettes pour que votre chat se sente en sécurité.

Confinezle dans une seule pièce les premiers jours pour faciliter son adaptation, puis élargissez progressivement son espace. Ne le forcez jamais à interagir.

Un rendez-vous vétérinaire rapide est conseillé pour vérifier la stérilisation et les vaccins.`,
  },
  {
    titre: 'L\'alimentation du chien',
    slug: 'alimentation-chien',
    espece: 'Chien',
    thematique: 'alimentation',
    contenu: `Renseignez-vous sur la nourriture donnée au refuge et changez-en progressivement pour éviter les troubles digestifs (transition sur 7 à 10 jours).

Adaptez les quantités à la taille, l'âge et l'activité de votre chien. Un chien adulte mange généralement 2 fois par jour. L'eau fraîche doit être disponible en permanence.

Évitez : chocolat, raisins, oignons, ail, noix de macadamia, xylitol — tous toxiques pour le chien.`,
  },
  {
    titre: 'L\'alimentation du chat',
    slug: 'alimentation-chat',
    espece: 'Chat',
    thematique: 'alimentation',
    contenu: `Le chat est un carnivore strict : sa nourriture doit être riche en protéines animales. Alternez croquettes et pâtées pour varier les textures et maintenir une bonne hydratation.

Le chat préfère grignoter plusieurs petites portions dans la journée. Ne le forcez pas à manger à heures fixes. L'eau doit toujours être disponible — les fontaines à eau encouragent la consommation.

Évitez : oignons, ail, chocolat, raisins, alcool et produits laitiers en grande quantité.`,
  },
  {
    titre: 'Les soins courants pour votre animal',
    slug: 'soins-courants',
    espece: undefined,
    thematique: 'soins',
    contenu: `Un suivi vétérinaire annuel est indispensable : vaccins, vermifugation, traitement antiparasitaire (puces, tiques). Demandez conseil à votre vétérinaire selon la région et le mode de vie de l'animal.

Brossez régulièrement votre animal selon la longueur de son pelage. Vérifiez les oreilles, les yeux et les dents. Les griffes peuvent être taillées si nécessaire.

En cas de comportement inhabituel (refus de manger, léthargie, boiterie), consultez rapidement.`,
  },
  {
    titre: 'Les premiers jours avec votre animal',
    slug: 'premiers-jours',
    espece: undefined,
    thematique: 'adaptation',
    contenu: `Un animal adopté en refuge a souvent vécu une période de stress. Les premiers jours peuvent être déroutants : il peut se cacher, refuser de manger ou montrer des comportements inhabituels. C'est normal.

Soyez patient et calme. Ne le forcez pas à interagir. Proposez-lui de la nourriture, de l'eau et un espace sûr. Respectez son rythme.

La confiance se construit progressivement. Certains animaux s'épanouissent en quelques jours, d'autres ont besoin de plusieurs semaines. Chaque animal est différent.`,
  },
];

export async function seedGuides(dataSource: DataSource) {
  const repo = dataSource.getRepository(Guide);
  const count = await repo.count();
  if (count > 0) return;
  await repo.save(guides.map((g) => repo.create(g)));
  console.log(`${guides.length} guides insérés.`);
}
