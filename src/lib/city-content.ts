import type { Lang } from './i18n';
import { calcPath, citiesPath, guidesPath } from './i18n';
import type { PlaceRecord, StateMeta } from './places';

export type CityGuideLink = {
  id: string;
  title: string;
  description: string;
  href: string;
};

function countyPhrase(place: PlaceRecord, state: StateMeta, lang: Lang): string {
  const counties = place.counties;
  if (counties.length === 0) return state.name;
  if (counties.length === 1) return counties[0];
  const joiner = lang === 'es' ? ' y ' : ' and ';
  return `${counties.slice(0, -1).join(', ')}${joiner}${counties[counties.length - 1]}`;
}

/** Localized copy blocks for city SEO pages (template + real place data). */
export function getCityPageCopy(place: PlaceRecord, state: StateMeta, lang: Lang = 'en') {
  const city = place.displayName;
  const counties = countyPhrase(place, state, lang);

  if (lang === 'es') {
    const placeLabel = place.type === 'incorporated' ? 'ciudad o pueblo' : 'área censal';
    return {
      city,
      stateName: state.name,
      stateAbbr: state.abbr,
      countyPhrase: counties,
      programIntro: `Los inquilinos en ${city}, ${state.abbr} suelen buscar el programa Housing Choice Voucher — conocido como Section 8. Los vouchers ayudan a hogares de ingresos muy bajos a pagar renta en vivienda privada. En esta ${placeLabel}, las reglas HUD suelen aplicarse a través de una Autoridad de Vivienda Pública (PHA) que atiende ${counties}.`,
      voucherExplain: `Un voucher Section 8 en el área de ${city} no paga toda su renta. Usted paga una parte (a menudo cerca del 30% del ingreso ajustado) y el voucher cubre parte de la renta hasta el estándar de pago local, basado en Fair Market Rents de HUD para ${counties}.`,
      waitingListNote: `La mayoría de las PHA cerca de ${city} tienen listas de espera que abren solo de vez en cuando. La elegibilidad depende del ingreso, tamaño del hogar y preferencias locales.`,
      calculatorPitch: `Como ${city} puede estar en un área HUD de varios condados, use nuestra calculadora por ZIP para confirmar condado, límites de ingreso y ayuda mensual estimada antes de contactar a su autoridad de vivienda.`,
      phaFinderUrl: 'https://www.hud.gov/program_offices/public_indian_housing/pha/contacts',
      breadcrumbAll: 'Todos los estados',
      h1: `Programas Section 8 y vouchers en ${city}, ${state.abbr}`,
      ctaTitle: `Estime la ayuda del voucher en ${city}`,
      ctaButton: 'Abrir calculadora Section 8',
      voucherSection: 'Programa Housing Choice Voucher',
      guidesSection: `Guías Section 8 para inquilinos en ${city}`,
      guidesLead: `Estas guías explican vouchers, límites de ingreso y cálculo de renta para hogares en ${city} y en ${state.name}. Cada una enlaza a nuestra calculadora.`,
      allGuides: 'Todas las guías Section 8 →',
      applySection: `Solicitar cerca de ${city}`,
      faqSection: `Preguntas frecuentes — Section 8 en ${city}`,
      moreCities: `Más ciudades en ${state.name}`,
      calcFooter: `Calcular para ${city}`,
      projectBased: 'Section 8 basado en proyecto — la subvención permanece en edificios específicos.',
      tenantBased: 'Vouchers basados en inquilino (HCV) — usted encuentra una unidad; el voucher puede trasladarse en muchos casos.',
      localPrefs: 'Preferencias locales — veteranos, adultos mayores, discapacidad o familias trabajadoras pueden tener prioridad.',
      applySteps: [
        'Confirme límites de ingreso con la calculadora.',
        `Busque su PHA en el directorio de contactos HUD (${counties}).`,
        'Únase a la lista de espera cuando la PHA abra solicitudes.',
        'Cuando sea seleccionado, encuentre renta al o debajo del estándar de pago e inspección.',
      ],
      phaDirectory: 'directorio de contactos HUD de PHA',
    };
  }

  const placeLabel = place.type === 'incorporated' ? 'city or town' : 'census area';
  return {
    city,
    stateName: state.name,
    stateAbbr: state.abbr,
    countyPhrase: counties,
    programIntro: `Renters in ${city}, ${state.abbr} often search for the Housing Choice Voucher program — commonly called Section 8. Vouchers help very low-income households afford rent in private housing. In this ${placeLabel}, HUD rules are usually applied through a Public Housing Authority (PHA) serving ${counties}.`,
    voucherExplain: `A Section 8 voucher in the ${city} area does not pay your full rent. You pay a tenant share (often about 30% of adjusted income), and the voucher covers part of the rent up to the local payment standard, which is based on HUD Fair Market Rents for ${counties}.`,
    waitingListNote: `Most PHAs near ${city} run waiting lists that open only periodically. Eligibility depends on income, household size, and local preferences — not on applying first online alone.`,
    calculatorPitch: `Because ${city} may sit in a multi-county HUD area, use our ZIP-based calculator to confirm your county, income limits, and estimated monthly voucher help before you contact a housing authority.`,
    phaFinderUrl: 'https://www.hud.gov/program_offices/public_indian_housing/pha/contacts',
    breadcrumbAll: 'All states',
    h1: `Section 8 programs & vouchers in ${city}, ${state.abbr}`,
    ctaTitle: `Estimate voucher help in ${city}`,
    ctaButton: 'Open Section 8 calculator',
    voucherSection: 'Housing Choice Voucher program',
    guidesSection: `Section 8 guides for ${city} renters`,
    guidesLead: `These guides explain vouchers, income limits, and rent math for households in ${city} and across ${state.name}. Each links to our calculator so you can run numbers for your ZIP.`,
    allGuides: 'All Section 8 guides →',
    applySection: `Apply near ${city}`,
    faqSection: `FAQ — Section 8 in ${city}`,
    moreCities: `More cities in ${state.name}`,
    calcFooter: `Calculate for ${city}`,
    projectBased: 'Project-based Section 8 — subsidy stays with specific buildings (different application path).',
    tenantBased: 'Tenant-based vouchers (HCV) — you find a unit; the voucher moves with you in many cases after initial lease-up.',
    localPrefs: 'Local preferences — veterans, elderly, disabled, or working families may get priority on some lists.',
    applySteps: [
      'Confirm income limits with the calculator.',
      `Find your PHA via the HUD PHA contact directory (${counties}).`,
      'Join the waiting list when the PHA opens applications — many lists close for years at a time.',
      'When selected, find a rental at or below the payment standard and complete inspection.',
    ],
    phaDirectory: 'HUD PHA contact directory',
  };
}

export function getCityFaq(place: PlaceRecord, state: StateMeta, lang: Lang = 'en') {
  const city = place.displayName;
  const counties = place.counties.join(', ') || state.name;

  if (lang === 'es') {
    return [
      {
        question: `¿Puedo usar Section 8 en ${city}, ${state.abbr}?`,
        answer: `Muchos inquilinos en ${city} pueden solicitar si cumplen los límites de ingreso HUD y la PHA local tiene lista abierta. Los vouchers a veces son portables, pero debe solicitar ante la autoridad que atiende su área — a menudo ${counties}.`,
      },
      {
        question: `¿Cuánta renta pagaré con un voucher cerca de ${city}?`,
        answer: `Su parte mínima es el Total Tenant Payment (TTP) — típicamente el mayor entre 30% del ingreso mensual ajustado, 10% del ingreso bruto o un mínimo de la PHA. Use nuestra calculadora con su ZIP para ${counties}.`,
      },
      {
        question: `¿Dónde solicito Section 8 en ${city}?`,
        answer: `Las solicitudes las maneja su PHA local, no este sitio. Busque el directorio de contactos HUD para autoridades que atienden ${counties}.`,
      },
      {
        question: `¿${city} tiene sus propios límites de ingreso?`,
        answer: `HUD publica límites y Fair Market Rents por condado o área metropolitana. ${city} usa los límites de ${counties}. Ingrese su ZIP en la calculadora para ver cifras actuales.`,
      },
    ];
  }

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

export function getCityUiPaths(lang: Lang) {
  return {
    calc: calcPath(lang),
    cities: citiesPath(lang),
    guides: guidesPath(lang),
  };
}
