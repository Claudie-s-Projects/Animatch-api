import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as cheerio from 'cheerio';
import { Animal } from '../animal/animal.entity';
import { Refuge } from '../refuge/refuge.entity';

const BASE = 'https://www.sanscollier.be';

@Injectable()
export class ScrapingService {
  private readonly logger = new Logger(ScrapingService.name);

  constructor(
    @InjectRepository(Animal) private readonly animals: Repository<Animal>,
    @InjectRepository(Refuge) private readonly refuges: Repository<Refuge>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async sync(): Promise<void> {
    this.logger.log('Synchronisation démarrée');
    try {
      const refuge = await this.upsertRefuge();
      const urls = await this.fetchUrls();
      const slugs = await this.scrapeAll(urls, refuge);
      await this.markMissing(slugs);
      this.logger.log(`Synchronisation terminée — ${slugs.length} animaux traités`);
    } catch (err) {
      this.logger.error('Erreur critique lors de la synchronisation', err);
    }
  }

  private async upsertRefuge(): Promise<Refuge> {
    let refuge = await this.refuges.findOneBy({ site_url: BASE });
    if (!refuge) {
      refuge = await this.refuges.save(
        this.refuges.create({
          nom: 'Sans Collier',
          ville: 'Perwez',
          site_url: BASE,
          telephone: '+32(0) 81 / 35 40 90',
        }),
      );
    }
    return refuge;
  }

  private async fetchUrls(): Promise<string[]> {
    const urls: string[] = [];
    for (const path of ['/chiens', '/chats']) {
      const html = await this.get(`${BASE}${path}`);
      const $ = cheerio.load(html);
      $('a[href]').each((_, el) => {
        const href = $(el).attr('href') ?? '';
        // filtre les pages de détail uniquement (ex: /chien/gustave/)
        if (/\/(chien|chat)\/[^/]+\/$/.test(href) && !urls.includes(href)) {
          urls.push(href);
        }
      });
    }
    return urls;
  }

  private async scrapeAll(urls: string[], refuge: Refuge): Promise<string[]> {
    const slugs: string[] = [];
    for (const url of urls) {
      try {
        const slug = url.replace(/\/$/, '').split('/').pop()!;
        await this.scrapeOne(url, slug, refuge);
        slugs.push(slug);
      } catch (err) {
        this.logger.error(`Échec scraping ${url}`, err);
      }
    }
    return slugs;
  }

  private async scrapeOne(url: string, slug: string, refuge: Refuge): Promise<void> {
    const html = await this.get(url);
    const $ = cheerio.load(html);

    const nom = $('h1').first().text().trim();
    const race = $('h2').first().text().trim();
    const sexe = $('h3').first().text().trim();
    const age = $('h4').first().text().replace(/Né\(e\) le\s*/i, '').trim();
    const espece = url.includes('/chien/') ? 'Chien' : 'Chat';
    const description = $('article p')
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean)
      .join('\n');
    const photo_url = $('img[src*="uploads"]').first().attr('src') ?? null;

    const existing = await this.animals.findOneBy({ slug });
    const photo = photo_url ?? undefined;
    if (existing) {
      await this.animals.update(existing.id, {
        nom, race, sexe, age, description, photo_url: photo, disponible: true,
      });
    } else {
      await this.animals.save(
        this.animals.create({
          nom, race, sexe, age, espece, description, photo_url: photo,
          slug, source_url: url, disponible: true,
          date_entree: new Date(),
          refuge,
        }),
      );
    }
  }

  // marque comme indisponible les animaux qui ne sont plus sur le site
  private async markMissing(slugs: string[]): Promise<void> {
    if (!slugs.length) return;
    await this.animals
      .createQueryBuilder()
      .update()
      .set({ disponible: false })
      .where('slug NOT IN (:...slugs)', { slugs })
      .andWhere('source_url LIKE :site', { site: '%sanscollier.be%' })
      .execute();
  }

  private async get(url: string): Promise<string> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
    return res.text();
  }
}
