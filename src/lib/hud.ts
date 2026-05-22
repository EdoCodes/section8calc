const HUD_BASE = 'https://www.huduser.gov/hudapi/public';

export type HudIncomeLimits = {
  year: number;
  entityId: string;
  areaName: string;
  /** Very low income (50% AMI) limits by household size 1–8 */
  veryLow: number[];
  /** Low income (80% AMI) */
  low: number[];
};

export type HudFmrRow = {
  bedrooms: number;
  fmr: number;
};

export type HudFmrData = {
  year: number;
  entityId: string;
  areaName: string;
  rows: HudFmrRow[];
  usesSmallAreaFmr: boolean;
};

function getToken(): string {
  const token = import.meta.env.HUD_API_TOKEN;
  if (!token) {
    throw new Error(
      'HUD API token is not configured. Add HUD_API_TOKEN to your environment.',
    );
  }
  return token;
}

async function hudGet(path: string): Promise<unknown> {
  const res = await fetch(`${HUD_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HUD API error (${res.status}): ${text.slice(0, 200)}`);
  }

  return res.json();
}

function pickLimitArray(data: Record<string, unknown>, prefix: string): number[] {
  const limits: number[] = [];
  for (let i = 1; i <= 8; i++) {
    const key = `${prefix}_${i}`;
    const val = data[key];
    if (typeof val === 'number') limits.push(val);
    else if (typeof val === 'string') limits.push(Number(val.replace(/,/g, '')));
  }
  return limits;
}

export async function fetchIncomeLimits(entityId: string): Promise<HudIncomeLimits> {
  const raw = (await hudGet(`/il/data/${entityId}`)) as {
    data?: Record<string, unknown>;
  };
  const data = raw.data ?? (raw as Record<string, unknown>);

  const year = Number(data.year ?? data.fiscal_year ?? new Date().getFullYear());
  const areaName = String(data.area_name ?? data.areaname ?? 'Your area');

  return {
    year,
    entityId,
    areaName,
    veryLow: pickLimitArray(data, 'VeryLow'),
    low: pickLimitArray(data, 'Low'),
  };
}

export async function fetchFmr(entityId: string): Promise<HudFmrData> {
  const raw = (await hudGet(`/fmr/data/${entityId}`)) as {
    data?: Record<string, unknown>;
  };
  const data = raw.data ?? (raw as Record<string, unknown>);

  const year = Number(data.year ?? new Date().getFullYear());
  const areaName = String(data.area_name ?? data.metro_name ?? 'Your area');

  const bedroomKeys = [
    { bedrooms: 0, key: 'Efficiency' },
    { bedrooms: 1, key: 'One-Bedroom' },
    { bedrooms: 2, key: 'Two-Bedroom' },
    { bedrooms: 3, key: 'Three-Bedroom' },
    { bedrooms: 4, key: 'Four-Bedroom' },
  ];

  const rows: HudFmrRow[] = [];
  for (const { bedrooms, key } of bedroomKeys) {
    const val = data[key];
    if (val != null) {
      rows.push({
        bedrooms,
        fmr: typeof val === 'number' ? val : Number(String(val).replace(/,/g, '')),
      });
    }
  }

  const zipEntries = data['Two-Bedroom'] == null && Array.isArray(data.data);
  const usesSmallAreaFmr = Boolean(zipEntries);

  return { year, entityId, areaName, rows, usesSmallAreaFmr };
}
