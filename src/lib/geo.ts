export type ZipPlace = {
  city: string;
  state: string;
  stateAbbr: string;
  latitude: number;
  longitude: number;
};

export type ZipCounty = {
  name: string;
  stateFips: string;
  countyFips: string;
  fullFips: string;
  entityId: string;
};

export type ZipLookupResult = {
  zip: string;
  places: ZipPlace[];
  counties: ZipCounty[];
};

const ZIP_RE = /^\d{5}$/;

/** HUD county-level entity id: SS + CCC + 99999 */
export function countyToHudEntityId(fullFips: string): string {
  const fips = fullFips.padStart(5, '0').slice(0, 5);
  return `${fips}99999`;
}

export function isValidZip(zip: string): boolean {
  return ZIP_RE.test(zip.trim());
}

export async function lookupZip(zipInput: string): Promise<ZipLookupResult> {
  const zip = zipInput.trim();
  if (!isValidZip(zip)) {
    throw new Error('Enter a valid 5-digit U.S. ZIP code.');
  }

  const zipRes = await fetch(`https://api.zippopotam.us/us/${zip}`, {
    headers: { Accept: 'application/json' },
  });

  if (!zipRes.ok) {
    throw new Error('ZIP code not found. Check the number and try again.');
  }

  const zipData = (await zipRes.json()) as {
    'post code': string;
    places: Array<{
      'place name': string;
      longitude: string;
      latitude: string;
      state: string;
      'state abbreviation': string;
    }>;
  };

  const places: ZipPlace[] = zipData.places.map((p) => ({
    city: p['place name'],
    state: p.state,
    stateAbbr: p['state abbreviation'],
    latitude: Number(p.latitude),
    longitude: Number(p.longitude),
  }));

  const countyMap = new Map<string, ZipCounty>();

  for (const place of places) {
    const areaUrl = new URL('https://geo.fcc.gov/api/census/area');
    areaUrl.searchParams.set('lat', String(place.latitude));
    areaUrl.searchParams.set('lon', String(place.longitude));
    areaUrl.searchParams.set('format', 'json');

    const areaRes = await fetch(areaUrl);
    if (!areaRes.ok) continue;

    const areaData = (await areaRes.json()) as {
      results?: Array<{
        county_fips: string;
        county_name: string;
        state_fips: string;
      }>;
    };

    const row = areaData.results?.[0];
    if (!row) continue;

    const fullFips = row.county_fips.padStart(5, '0');
    if (!countyMap.has(fullFips)) {
      countyMap.set(fullFips, {
        name: row.county_name,
        stateFips: row.state_fips,
        countyFips: fullFips.slice(2, 5),
        fullFips,
        entityId: countyToHudEntityId(fullFips),
      });
    }
  }

  if (countyMap.size === 0) {
    throw new Error('Could not resolve county for this ZIP. Try a nearby ZIP.');
  }

  return {
    zip,
    places,
    counties: [...countyMap.values()].sort((a, b) => a.name.localeCompare(b.name)),
  };
}
