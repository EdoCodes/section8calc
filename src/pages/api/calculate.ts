import type { APIRoute } from 'astro';
import { fetchFmr, fetchIncomeLimits } from '../../lib/hud';
import {
  assessEligibility,
  computeSubsidy,
  fmrForBedrooms,
} from '../../lib/section8-calc';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }

  const entityId = String(body.entityId ?? '').trim();
  const zip = String(body.zip ?? '').trim();
  const city = String(body.city ?? '').trim();
  const county = String(body.county ?? '').trim();
  const stateAbbr = String(body.stateAbbr ?? '').trim();
  const annualGrossIncome = Number(body.annualGrossIncome);
  const householdSize = Number(body.householdSize);
  const bedrooms = Number(body.bedrooms ?? 2);
  const monthlyRent = body.monthlyRent != null ? Number(body.monthlyRent) : undefined;
  const annualDeductions = body.annualDeductions != null ? Number(body.annualDeductions) : 0;

  if (!entityId || entityId.length < 10) {
    return json({ error: 'Missing HUD area. Confirm your ZIP and county.' }, 400);
  }
  if (!Number.isFinite(annualGrossIncome) || annualGrossIncome < 0) {
    return json({ error: 'Enter a valid annual household income.' }, 400);
  }
  if (!Number.isInteger(householdSize) || householdSize < 1 || householdSize > 8) {
    return json({ error: 'Household size must be between 1 and 8.' }, 400);
  }

  try {
    const [incomeLimits, fmrData] = await Promise.all([
      fetchIncomeLimits(entityId),
      fetchFmr(entityId),
    ]);

    const eligibility = assessEligibility(
      annualGrossIncome,
      householdSize,
      incomeLimits.veryLow,
      incomeLimits.low,
    );

    const fmrAmount = fmrForBedrooms(fmrData.rows, bedrooms);
    const subsidy = computeSubsidy(
      {
        annualGrossIncome,
        householdSize,
        bedrooms,
        annualDeductions,
        monthlyRent,
      },
      fmrAmount,
    );

    return json({
      location: { zip, city, county, stateAbbr, entityId },
      incomeLimits: {
        year: incomeLimits.year,
        areaName: incomeLimits.areaName,
        veryLowLimit: eligibility.veryLowLimit,
        lowLimit: eligibility.lowLimit,
      },
      fmr: {
        year: fmrData.year,
        areaName: fmrData.areaName,
        bedrooms,
        fmrAmount,
        usesSmallAreaFmr: fmrData.usesSmallAreaFmr,
      },
      eligibility,
      subsidy,
      disclaimer:
        'Educational estimate only. Your Public Housing Authority makes final eligibility and payment decisions.',
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Calculation failed. Try again later.';
    const status = message.includes('HUD API token') ? 503 : 502;
    return json({ error: message }, status);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
