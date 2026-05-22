import type { PlaceRecord, StateMeta } from './places';

export type CityGuideLink = {
  id: string;
  title: string;
  description: string;
  href: string;
};

/** Localized copy blocks for city SEO pages (template + real place data). */
export function getCityPageCopy(place: PlaceRecord, state: StateMeta) {
  const city = place.displayName;
  const counties = place.counties;
  const countyPhrase =
    counties.length === 0
      ? state.name
      : counties.length === 1
        ? counties[0]
        : `${counties.slice(0, -1).join(', ')} and ${counties[counties.length - 1]}`;

  const placeLabel =
    place.type === 'incorporated' ? 'city or town' : 'census area';

  return {
    city,
    stateName: state.name,
    stateAbbr: state.abbr,
    countyPhrase,
    programIntro: `Renters in ${city}, ${state.abbr} often search for the Housing Choice Voucher program — commonly called Section 8. Vouchers help very low-income households afford rent in private housing. In this ${placeLabel}, HUD rules are usually applied through a Public Housing Authority (PHA) serving ${countyPhrase}.`,
    voucherExplain: `A Section 8 voucher in the ${city} area does not pay your full rent. You pay a tenant share (often about 30% of adjusted income), and the voucher covers part of the rent up to the local payment standard, which is based on HUD Fair Market Rents for ${countyPhrase}.`,
    waitingListNote: `Most PHAs near ${city} run waiting lists that open only periodically. Eligibility depends on income, household size, and local preferences — not on applying first online alone.`,
    calculatorPitch: `Because ${city} may sit in a multi-county HUD area, use our ZIP-based calculator to confirm your county, income limits, and estimated monthly voucher help before you contact a housing authority.`,
    phaFinderUrl: 'https://www.hud.gov/program_offices/public_indian_housing/pha/contacts',
  };
}

export function getCityFaq(place: PlaceRecord, state: StateMeta) {
  const city = place.displayName;
  const counties = place.counties.join(', ') || state.name;

  return [
    {
      question: `Can I use Section 8 in ${city}, ${state.abbr}?`,
      answer: `Many renters in ${city} can apply if they meet HUD income limits and the local PHA has an open waiting list. Vouchers are portable in some cases, but you must apply through the housing authority that serves your area — often tied to ${counties}.`,
    },
    {
      question: `How much rent will I pay with a voucher near ${city}?`,
      answer: `Your minimum share is the Total Tenant Payment (TTP) — typically the greater of 30% of adjusted monthly income, 10% of gross income, or a small PHA minimum. Use our calculator with your ZIP to see an estimate for ${counties}.`,
    },
    {
      question: `Where do I apply for Section 8 in ${city}?`,
      answer: `Applications are handled by your local Public Housing Authority, not this website. Search HUD's PHA contact directory for authorities serving ${counties}, then follow their waiting list instructions.`,
    },
    {
      question: `Does ${city} have its own income limits?`,
      answer: `HUD publishes income limits and Fair Market Rents by county or metro area. ${city} uses the limits for ${counties}. Enter your ZIP in our calculator to pull the current HUD figures for your household size.`,
    },
  ];
}
