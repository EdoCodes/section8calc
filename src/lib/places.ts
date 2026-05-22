import statesJson from '../data/states.json';
import placesMeta from '../data/places-meta.json';

export type PlaceRecord = {
  slug: string;
  displayName: string;
  legalName: string;
  state: string;
  stateName: string;
  stateSlug: string;
  placeFips: string;
  entityKey: string;
  type: 'incorporated' | 'cdp';
  counties: string[];
};

export type StateMeta = {
  abbr: string;
  name: string;
  slug: string;
  placeCount: number;
};

export const states = statesJson as StateMeta[];
export const placesMetaInfo = placesMeta as {
  generatedAt: string;
  totalPlaces: number;
  stateCount: number;
};

const placeModules = import.meta.glob('../data/places/*.json', {
  eager: true,
}) as Record<string, PlaceRecord[] | { default: PlaceRecord[] }>;

function moduleToPlaces(mod: PlaceRecord[] | { default: PlaceRecord[] } | undefined): PlaceRecord[] {
  if (!mod) return [];
  if (Array.isArray(mod)) return mod;
  return mod.default ?? [];
}

export function getStateBySlug(slug: string): StateMeta | undefined {
  return states.find((s) => s.slug === slug.toLowerCase());
}

export function getPlacesForState(abbr: string): PlaceRecord[] {
  const key = `../data/places/${abbr.toUpperCase()}.json`;
  return moduleToPlaces(placeModules[key]);
}

export function getPlace(stateSlug: string, citySlug: string): PlaceRecord | undefined {
  const state = getStateBySlug(stateSlug);
  if (!state) return undefined;
  return getPlacesForState(state.abbr).find((p) => p.slug === citySlug);
}

/** Build all static paths for city pages (called once at build). */
export function getAllCityPaths(): Array<{
  params: { state: string; city: string };
  props: { place: PlaceRecord; state: StateMeta };
}> {
  const paths: Array<{
    params: { state: string; city: string };
    props: { place: PlaceRecord; state: StateMeta };
  }> = [];

  for (const state of states) {
    const places = getPlacesForState(state.abbr);
    for (const place of places) {
      paths.push({
        params: { state: state.slug, city: place.slug },
        props: { place, state },
      });
    }
  }

  return paths;
}

export function groupPlacesByLetter(places: PlaceRecord[]): Map<string, PlaceRecord[]> {
  const map = new Map<string, PlaceRecord[]>();
  for (const place of places) {
    const letter = (place.displayName[0] ?? '#').toUpperCase();
    const key = /[A-Z]/.test(letter) ? letter : '#';
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(place);
  }
  return new Map([...map.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

export function placeTypeLabel(type: PlaceRecord['type']): string {
  return type === 'incorporated' ? 'City / town' : 'Census designated place';
}
