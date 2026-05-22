/**
 * Downloads Census 2020 national places and writes per-state JSON for static city pages.
 * Source: https://www2.census.gov/geo/docs/reference/codes2020/national_place2020.txt
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_DIR = join(ROOT, 'src', 'data', 'places');
const CENSUS_URL =
  'https://www2.census.gov/geo/docs/reference/codes2020/national_place2020.txt';

const STATE_NAMES = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  PR: 'Puerto Rico',
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function cleanDisplayName(placeName) {
  return placeName
    .replace(
      /\s+(city|town|village|borough|CDP|municipality|plantation|comunidad| zona urbana|commonwealth|balance)$/i,
      '',
    )
    .trim();
}

function parseCounties(raw) {
  if (!raw) return [];
  return raw.split('~~~').map((c) => c.replace(/\s+County$/i, ' County').trim());
}

async function fetchCensusPlaces() {
  const res = await fetch(CENSUS_URL);
  if (!res.ok) throw new Error(`Census download failed: ${res.status}`);
  return res.text();
}

function parseLines(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  const header = lines[0];
  if (!header.startsWith('STATE|')) {
    throw new Error('Unexpected Census file format');
  }

  const byState = new Map();
  const slugRegistry = new Map();

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split('|');
    if (parts.length < 9) continue;

    const [state, stateFp, placeFp, , placeName, type] = parts;
    const counties = parseCounties(parts[8]);

    if (!STATE_NAMES[state]) continue;

    const displayName = cleanDisplayName(placeName);
    let baseSlug = slugify(displayName);
    if (!baseSlug) baseSlug = `place-${placeFp}`;

    const regKey = `${state}:${baseSlug}`;
    const seen = slugRegistry.get(regKey) ?? 0;
    slugRegistry.set(regKey, seen + 1);
    const slug = seen > 0 ? `${baseSlug}-${placeFp}` : baseSlug;

    const entry = {
      slug,
      displayName,
      legalName: placeName,
      state,
      stateName: STATE_NAMES[state],
      stateSlug: state.toLowerCase(),
      placeFips: placeFp,
      entityKey: `${stateFp}${placeFp}`,
      type: type.includes('INCORPORATED') ? 'incorporated' : 'cdp',
      counties,
    };

    if (!byState.has(state)) byState.set(state, []);
    byState.get(state).push(entry);
  }

  for (const [, list] of byState) {
    list.sort((a, b) => a.displayName.localeCompare(b.displayName));
  }

  return byState;
}

async function main() {
  console.log('Downloading Census 2020 places…');
  const text = await fetchCensusPlaces();
  const byState = parseLines(text);

  mkdirSync(DATA_DIR, { recursive: true });

  const statesMeta = [];
  let totalPlaces = 0;

  for (const [abbr, places] of [...byState.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    writeFileSync(join(DATA_DIR, `${abbr}.json`), JSON.stringify(places));
    statesMeta.push({
      abbr,
      name: STATE_NAMES[abbr],
      slug: abbr.toLowerCase(),
      placeCount: places.length,
    });
    totalPlaces += places.length;
    console.log(`  ${abbr}: ${places.length} places`);
  }

  writeFileSync(
    join(ROOT, 'src', 'data', 'states.json'),
    JSON.stringify(statesMeta, null, 2),
  );

  writeFileSync(
    join(ROOT, 'src', 'data', 'places-meta.json'),
    JSON.stringify({ generatedAt: new Date().toISOString(), totalPlaces, stateCount: statesMeta.length }),
  );

  console.log(`\nDone: ${totalPlaces} place pages across ${statesMeta.length} states/territories.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
