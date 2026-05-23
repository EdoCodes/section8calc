import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { Lang } from './i18n';

type CityArticleCollection = 'city-articles' | 'city-articles-es';

const COLLECTION_BY_LANG: Record<Lang, CityArticleCollection> = {
  en: 'city-articles',
  es: 'city-articles-es',
};

export type CityArticleEntry = CollectionEntry<CityArticleCollection>;

function normalizeSlug(slug: string): string {
  return slug.trim().toLowerCase();
}

export function cityArticleCollectionKey(lang: Lang): CollectionKey {
  return COLLECTION_BY_LANG[lang];
}

/** All published articles for a city, sorted by `order` then filename. */
export async function getCityArticlesForPlace(
  stateSlug: string,
  citySlug: string,
  lang: Lang = 'en',
): Promise<CityArticleEntry[]> {
  const collection = COLLECTION_BY_LANG[lang];
  const state = normalizeSlug(stateSlug);
  const city = normalizeSlug(citySlug);

  const articles = await getCollection(collection, ({ data, id }) => {
    if (data.draft) return false;
    if (id.includes('_template') || id.includes('_example')) return false;
    return data.stateSlug === state && data.citySlug === city;
  });

  return articles.sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}

export async function hasCityEnrichment(
  stateSlug: string,
  citySlug: string,
  lang: Lang = 'en',
): Promise<boolean> {
  const articles = await getCityArticlesForPlace(stateSlug, citySlug, lang);
  return articles.length > 0;
}

export type CityEnrichmentMeta = {
  seoTitle?: string;
  seoDescription?: string;
};

/** SEO overrides from the primary (lowest order) city article, if any. */
export async function getCityEnrichmentMeta(
  stateSlug: string,
  citySlug: string,
  lang: Lang = 'en',
): Promise<CityEnrichmentMeta | null> {
  const articles = await getCityArticlesForPlace(stateSlug, citySlug, lang);
  const primary = articles[0];
  if (!primary) return null;

  const { seoTitle, seoDescription, description } = primary.data;
  if (!seoTitle && !seoDescription && !description) return { seoTitle: undefined, seoDescription: undefined };

  return {
    seoTitle,
    seoDescription: seoDescription ?? description,
  };
}

/** Extra FAQ items from all city articles (appended after template FAQ). */
export async function getCityExtraFaq(
  stateSlug: string,
  citySlug: string,
  lang: Lang = 'en',
): Promise<Array<{ question: string; answer: string }>> {
  const articles = await getCityArticlesForPlace(stateSlug, citySlug, lang);
  return articles.flatMap((a) => a.data.extraFaq);
}

export function getCityEnrichmentLabels(lang: Lang) {
  if (lang === 'es') {
    return {
      badge: 'Guía local ampliada',
      updated: 'Actualizado',
    };
  }
  return {
    badge: 'Expanded local guide',
    updated: 'Updated',
  };
}
