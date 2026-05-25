export type Lang = 'en' | 'es';

export type CalcStrings = {
  title: string;
  subtitle: string;
  stepLocation: string;
  stepHousehold: string;
  stepResults: string;
  zip: string;
  zipHint: string;
  city: string;
  county: string;
  cityPlaceholder: string;
  householdLegend: string;
  householdSize: string;
  person: string;
  people: string;
  bedrooms: string;
  studio: string;
  br: string;
  annualIncome: string;
  annualIncomeHint: string;
  deductions: string;
  deductionsHint: string;
  optional: string;
  monthlyRent: string;
  monthlyRentHint: string;
  submit: string;
  lookingUp: string;
  locationFound: (places: number, counties: number, zip: string) => string;
  zipFirst: string;
  noZip: string;
  resultsTitle: string;
  resultsPlaceholder: string;
  yourShare: string;
  yourSharePlain: string;
  yourShareHint: string;
  paymentStandard: string;
  paymentStandardPlain: string;
  paymentStandardHint: string;
  maxHelp: string;
  maxHelpPlain: string;
  maxHelpHint: string;
  fmrBasis: string;
  fmrBasisPlain: string;
  fmrBasisHint: string;
  ttpFocusBadge: string;
  detailsSummary: string;
  incomeLimitPlain: string;
  perMonth: string;
  perYear: string;
  veryLowLimit: string;
  withRent: (amount: string) => string;
  rentAbove: (amount: string) => string;
  eligible: string;
  possiblyEligible: string;
  notEligible: string;
};

const enCalc: CalcStrings = {
  title: 'Section 8 eligibility & rent estimate',
  subtitle: 'Enter your ZIP, confirm your area, then see HUD income limits and estimated voucher help.',
  stepLocation: 'Location',
  stepHousehold: 'Household',
  stepResults: 'Your estimate',
  zip: 'ZIP code',
  zipHint: 'We load matching cities and counties automatically.',
  city: 'City',
  county: 'County',
  cityPlaceholder: 'Enter ZIP first',
  householdLegend: 'Household & income',
  householdSize: 'Household size',
  person: 'person',
  people: 'people',
  bedrooms: 'Bedrooms on voucher',
  studio: 'Studio',
  br: 'bedroom',
  annualIncome: 'Annual household income (before taxes)',
  annualIncomeHint: 'Add up income for everyone who will be on the lease — wages, benefits, etc.',
  deductions: 'Annual income deductions',
  deductionsHint: 'Elderly/disabled, childcare, medical — per PHA rules.',
  optional: 'optional',
  monthlyRent: "Monthly rent you're considering",
  monthlyRentHint: 'Leave blank for maximum possible subsidy before you pick a unit.',
  submit: 'Calculate my estimate',
  lookingUp: 'Looking up ZIP…',
  locationFound: (places, counties, zip) =>
    `Found ${places} place(s) and ${counties} county option(s) for ZIP ${zip}. Confirm below.`,
  zipFirst: 'Enter a valid ZIP and wait for city/county to load.',
  noZip: 'ZIP lookup failed',
  resultsTitle: 'Your results',
  resultsPlaceholder: 'Complete the form and calculate to see eligibility, income limits, and estimated voucher help.',
  yourShare: 'Your share (TTP)',
  yourSharePlain: 'What you pay each month',
  yourShareHint: 'Your minimum rent share (TTP) — often about 30% of adjusted income, before utilities.',
  paymentStandard: 'Payment standard',
  paymentStandardPlain: 'Rent limit the voucher uses',
  paymentStandardHint: 'Based on HUD Fair Market Rent for your bedroom size.',
  maxHelp: 'Max voucher help',
  maxHelpPlain: 'Voucher may pay up to',
  maxHelpHint: 'Before you choose a unit — actual amount depends on rent and income.',
  fmrBasis: 'FMR basis',
  fmrBasisPlain: 'HUD rent benchmark',
  fmrBasisHint: 'Fair Market Rent for the area and bedroom count.',
  ttpFocusBadge: 'Focus here',
  detailsSummary: 'See all numbers (payment standard, voucher help, HUD rent)',
  incomeLimitPlain: 'Income limit for your household size',
  perMonth: '/mo',
  perYear: '/yr',
  veryLowLimit: 'Very low income limit for your household',
  withRent: (amount) => `With rent entered: estimated voucher payment ${amount}/mo.`,
  rentAbove: (amount) => `Rent is ${amount} above the payment standard — you pay that extra.`,
  eligible: 'Likely meets very low income requirement for Housing Choice Vouchers',
  possiblyEligible: 'Income is above very low but within low income limits — PHA preferences may apply',
  notEligible: 'Income appears above HUD low income limits for this area',
};

const esCalc: CalcStrings = {
  title: 'Elegibilidad Section 8 y estimación de renta',
  subtitle:
    'Ingrese su código postal, confirme su área y vea los límites de ingreso HUD y la ayuda estimada del voucher.',
  stepLocation: 'Ubicación',
  stepHousehold: 'Hogar',
  stepResults: 'Su estimación',
  zip: 'Código postal (ZIP)',
  zipHint: 'Cargamos ciudades y condados automáticamente.',
  city: 'Ciudad',
  county: 'Condado',
  cityPlaceholder: 'Ingrese ZIP primero',
  householdLegend: 'Hogar e ingresos',
  householdSize: 'Tamaño del hogar',
  person: 'persona',
  people: 'personas',
  bedrooms: 'Recámaras en el voucher',
  studio: 'Estudio',
  br: 'recámara',
  annualIncome: 'Ingreso anual del hogar (antes de impuestos)',
  annualIncomeHint: 'Sume el ingreso de quienes vivirán en la unidad — salarios, beneficios, etc.',
  deductions: 'Deducciones de ingreso anuales',
  deductionsHint: 'Adulto mayor/discapacidad, cuidado infantil, médicos — según reglas de la PHA.',
  optional: 'opcional',
  monthlyRent: 'Renta mensual que considera',
  monthlyRentHint: 'Deje en blanco para la subvención máxima posible antes de elegir unidad.',
  submit: 'Calcular mi estimación',
  lookingUp: 'Buscando ZIP…',
  locationFound: (places, counties, zip) =>
    `Se encontraron ${places} ciudad(es) y ${counties} condado(s) para ZIP ${zip}. Confirme abajo.`,
  zipFirst: 'Ingrese un ZIP válido y espere la carga de ciudad/condado.',
  noZip: 'No se encontró el ZIP',
  resultsTitle: 'Sus resultados',
  resultsPlaceholder:
    'Complete el formulario para ver elegibilidad, límites de ingreso y ayuda estimada del voucher.',
  yourShare: 'Su parte (TTP)',
  yourSharePlain: 'Lo que usted paga al mes',
  yourShareHint: 'Su parte mínima de renta (TTP) — a menudo cerca del 30% del ingreso ajustado, antes de servicios.',
  paymentStandard: 'Estándar de pago',
  paymentStandardPlain: 'Límite de renta del voucher',
  paymentStandardHint: 'Basado en Fair Market Rent de HUD para su tamaño de unidad.',
  maxHelp: 'Ayuda máxima del voucher',
  maxHelpPlain: 'El voucher puede pagar hasta',
  maxHelpHint: 'Antes de elegir unidad — el monto real depende de renta e ingreso.',
  fmrBasis: 'Base FMR',
  fmrBasisPlain: 'Referencia de renta HUD',
  fmrBasisHint: 'Fair Market Rent del área y número de recámaras.',
  ttpFocusBadge: 'Número principal',
  detailsSummary: 'Ver todos los números (estándar de pago, ayuda, renta HUD)',
  incomeLimitPlain: 'Límite de ingreso para su tamaño de hogar',
  perMonth: '/mes',
  perYear: '/año',
  veryLowLimit: 'Límite de ingreso muy bajo para su hogar',
  withRent: (amount) => `Con la renta ingresada: pago estimado del voucher ${amount}/mes.`,
  rentAbove: (amount) => `La renta supera el estándar de pago en ${amount} — usted paga el excedente.`,
  eligible: 'Probablemente cumple el requisito de ingreso muy bajo para vouchers de elección de vivienda',
  possiblyEligible:
    'El ingreso está por encima de muy bajo pero dentro de límites bajos — pueden aplicar preferencias de la PHA',
  notEligible: 'El ingreso parece estar por encima de los límites bajos de HUD para esta área',
};

export function getCalcStrings(lang: Lang): CalcStrings {
  return lang === 'es' ? esCalc : enCalc;
}

/** JSON-safe strings for calculator client script (`define:vars` cannot pass functions). */
export type CalcClientStrings = {
  lang: Lang;
  locale: string;
  lookingUp: string;
  zipFirst: string;
  noZip: string;
  zipLookupBtn: string;
  zipLooking: string;
  locationReady: string;
  calculating: string;
  apiUnavailable: string;
  calcFailed: string;
  tplLocationFound: string;
  tplWithRent: string;
  tplRentAbove: string;
  eligible: string;
  possiblyEligible: string;
  notEligible: string;
  yourShare: string;
  yourSharePlain: string;
  yourShareHint: string;
  paymentStandard: string;
  paymentStandardPlain: string;
  paymentStandardHint: string;
  maxHelp: string;
  maxHelpPlain: string;
  maxHelpHint: string;
  fmrBasis: string;
  fmrBasisPlain: string;
  fmrBasisHint: string;
  ttpFocusBadge: string;
  detailsSummary: string;
  incomeLimitPlain: string;
  perMonth: string;
  perYear: string;
  veryLowLimit: string;
  submitLabel: string;
  eligiblePlain: string;
  possiblyEligiblePlain: string;
  notEligiblePlain: string;
  trafficGood: string;
  trafficMaybe: string;
  trafficUnlikely: string;
  incomeExamples: Record<string, string>;
  nextStepsTitle: string;
  nextStepsLead: string;
  nextStepsLink: string;
  nextStepsHref: string;
  printResults: string;
  savePdf: string;
  savePdfHint: string;
  printTitle: string;
};

const INCOME_EXAMPLE_AMOUNTS: Record<number, number> = {
  1: 18_000,
  2: 24_000,
  3: 28_000,
  4: 34_000,
  5: 40_000,
  6: 46_000,
  7: 52_000,
  8: 58_000,
};

function buildIncomeExamples(lang: Lang): Record<string, string> {
  const locale = lang === 'es' ? 'es-US' : 'en-US';
  const fmt = (n: number) =>
    n.toLocaleString(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const out: Record<string, string> = {};
  for (let size = 1; size <= 8; size++) {
    const amount = fmt(INCOME_EXAMPLE_AMOUNTS[size] ?? 30_000);
    out[String(size)] =
      lang === 'es'
        ? `Ej. ${amount}/año para ${size} ${size === 1 ? 'persona' : 'personas'} (solo referencia)`
        : `e.g. ${amount}/year for ${size} ${size === 1 ? 'person' : 'people'} (example only)`;
  }
  return out;
}

export function getCalcClientStrings(lang: Lang): CalcClientStrings {
  const t = getCalcStrings(lang);
  const nextHref = `${guidesPath(lang)}how-to-apply-section-8-waiting-list/`;
  const incomeExamples = buildIncomeExamples(lang);
  if (lang === 'es') {
    return {
      lang,
      locale: 'es-US',
      submitLabel: t.submit,
      lookingUp: t.lookingUp,
      zipFirst: t.zipFirst,
      noZip: t.noZip,
      zipLookupBtn: 'Buscar área',
      zipLooking: 'Buscando…',
      locationReady: 'Área confirmada — complete ingresos y calcule',
      calculating: 'Calculando…',
      apiUnavailable:
        'No se pudo conectar al servidor. Si ve una vista previa estática, use el sitio publicado en Netlify.',
      calcFailed: 'Error al calcular. Verifique su ZIP e intente de nuevo.',
      tplLocationFound:
        'Se encontraron {places} ciudad(es) y {counties} condado(s) para ZIP {zip}. Confirme abajo.',
      tplWithRent: 'Con la renta ingresada: pago estimado del voucher {amount}/mes.',
      tplRentAbove: 'La renta supera el estándar de pago en {amount} — usted paga el excedente.',
      eligible: t.eligible,
      possiblyEligible: t.possiblyEligible,
      notEligible: t.notEligible,
      yourShare: t.yourShare,
      yourSharePlain: t.yourSharePlain,
      yourShareHint: t.yourShareHint,
      paymentStandard: t.paymentStandard,
      paymentStandardPlain: t.paymentStandardPlain,
      paymentStandardHint: t.paymentStandardHint,
      maxHelp: t.maxHelp,
      maxHelpPlain: t.maxHelpPlain,
      maxHelpHint: t.maxHelpHint,
      fmrBasis: t.fmrBasis,
      fmrBasisPlain: t.fmrBasisPlain,
      fmrBasisHint: t.fmrBasisHint,
      ttpFocusBadge: t.ttpFocusBadge,
      detailsSummary: t.detailsSummary,
      incomeLimitPlain: t.incomeLimitPlain,
      perMonth: t.perMonth,
      perYear: t.perYear,
      veryLowLimit: t.veryLowLimit,
      eligiblePlain: 'Es probable que califique según los límites de ingreso HUD.',
      possiblyEligiblePlain: 'Podría calificar — su ingreso está en el rango bajo; la PHA local decide.',
      notEligiblePlain: 'Su ingreso parece estar por encima de los límites HUD para esta área.',
      trafficGood: 'Buena probabilidad',
      trafficMaybe: 'Tal vez',
      trafficUnlikely: 'Poco probable',
      incomeExamples,
      nextStepsTitle: '¿Qué sigue?',
      nextStepsLead: 'Esta herramienta no acepta solicitudes. Debe contactar a su Autoridad de Vivienda Pública (PHA) local.',
      nextStepsLink: 'Cómo solicitar y listas de espera →',
      nextStepsHref: nextHref,
      printResults: 'Imprimir resultados',
      savePdf: 'Guardar como PDF',
      savePdfHint: 'Abre el diálogo de impresión — elija «Guardar como PDF».',
      printTitle: 'Estimación Section 8',
    };
  }
  return {
    lang,
    locale: 'en-US',
    submitLabel: t.submit,
    lookingUp: t.lookingUp,
    zipFirst: t.zipFirst,
    noZip: t.noZip,
    zipLookupBtn: 'Find my area',
    zipLooking: 'Looking up…',
    locationReady: 'Area confirmed — add income and calculate',
    calculating: 'Calculating…',
    apiUnavailable:
      'Could not reach the calculator API. If you opened a static file preview, use the live Netlify site instead.',
    calcFailed: 'Calculation failed. Check your ZIP and try again.',
    tplLocationFound:
      'Found {places} place(s) and {counties} county option(s) for ZIP {zip}. Confirm below.',
    tplWithRent: 'With rent entered: estimated voucher payment {amount}/mo.',
    tplRentAbove: 'Rent is {amount} above the payment standard — you pay that extra.',
    eligible: t.eligible,
    possiblyEligible: t.possiblyEligible,
    notEligible: t.notEligible,
    yourShare: t.yourShare,
    yourSharePlain: t.yourSharePlain,
    yourShareHint: t.yourShareHint,
    paymentStandard: t.paymentStandard,
    paymentStandardPlain: t.paymentStandardPlain,
    paymentStandardHint: t.paymentStandardHint,
    maxHelp: t.maxHelp,
    maxHelpPlain: t.maxHelpPlain,
    maxHelpHint: t.maxHelpHint,
    fmrBasis: t.fmrBasis,
    fmrBasisPlain: t.fmrBasisPlain,
    fmrBasisHint: t.fmrBasisHint,
    ttpFocusBadge: t.ttpFocusBadge,
    detailsSummary: t.detailsSummary,
    incomeLimitPlain: t.incomeLimitPlain,
    perMonth: t.perMonth,
    perYear: t.perYear,
    veryLowLimit: t.veryLowLimit,
    eligiblePlain: 'You likely meet HUD income limits for this area.',
    possiblyEligiblePlain: 'You may qualify — income is in the low range; your local PHA makes the final call.',
    notEligiblePlain: 'Your income appears above HUD limits for this area.',
    trafficGood: 'Good chance',
    trafficMaybe: 'Maybe',
    trafficUnlikely: 'Unlikely',
    incomeExamples,
    nextStepsTitle: 'What happens next?',
    nextStepsLead:
      'This tool does not accept applications. You must apply through your local Public Housing Authority (PHA).',
    nextStepsLink: 'How to apply & waiting lists →',
    nextStepsHref: nextHref,
    printResults: 'Print results',
    savePdf: 'Save as PDF',
    savePdfHint: 'Opens print dialog — choose “Save as PDF” as the destination.',
    printTitle: 'Section 8 estimate',
  };
}

export function formatTpl(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
}

export type SiteStrings = {
  lang: Lang;
  siteName: string;
  siteTagline: string;
  navCities: string;
  navGuides: string;
  navBlog: string;
  navCta: string;
  langSwitch: string;
  langSwitchLabel: string;
  footerDisclaimer: string;
  calcLink: string;
  guidesLink: string;
  citiesLink: string;
  blogLink: string;
};

export function getSiteStrings(lang: Lang): SiteStrings {
  if (lang === 'es') {
    return {
      lang: 'es',
      siteName: 'Calculadora Section 8',
      siteTagline: 'Elegibilidad y renta con voucher',
      navCities: 'Por ciudad',
      navGuides: 'Guías',
      navBlog: 'Blog',
      navCta: 'Ver elegibilidad',
      langSwitch: 'English',
      langSwitchLabel: 'Cambiar a inglés',
      footerDisclaimer:
        'Este sitio ofrece estimaciones educativas basadas en límites de ingreso y FMR de HUD. No está afiliado a HUD ni a su PHA local. Solicite siempre a través de su PHA.',
      calcLink: 'Calculadora Section 8',
      guidesLink: 'Guías de vivienda',
      citiesLink: 'Directorio por ciudad',
      blogLink: 'Blog',
    };
  }
  return {
    lang: 'en',
    siteName: 'Section 8 Calculator',
    siteTagline: 'Voucher eligibility & rent estimates',
    navCities: 'By city',
    navGuides: 'Guides',
    navBlog: 'Blog',
    navCta: 'Check eligibility',
    langSwitch: 'Español',
    langSwitchLabel: 'Switch to Spanish',
    footerDisclaimer:
      'This site provides educational estimates based on HUD income limits and Fair Market Rents. It is not affiliated with HUD or your local Public Housing Authority. Always apply through your PHA for official determinations.',
    calcLink: 'Section 8 calculator',
    guidesLink: 'Housing guides',
    citiesLink: 'Browse by city',
    blogLink: 'Blog',
  };
}

export type HomeStrings = {
  guidesTitle: string;
  allGuides: string;
  browseByStateTitle: string;
  stateFilterLabel: string;
  stateFilterPlaceholder: string;
  viewAllStates: string;
};

export function getHomeStrings(lang: Lang): HomeStrings {
  if (lang === 'es') {
    return {
      guidesTitle: 'Guías populares Section 8',
      allGuides: 'Ver todas las guías',
      browseByStateTitle: 'Section 8 por estado',
      stateFilterLabel: 'Filtrar estados',
      stateFilterPlaceholder: 'Ej. California, CA…',
      viewAllStates: 'Ver todos los estados →',
    };
  }
  return {
    guidesTitle: 'Popular Section 8 guides',
    allGuides: 'Browse all guides',
    browseByStateTitle: 'Browse Section 8 by state',
    stateFilterLabel: 'Filter states',
    stateFilterPlaceholder: 'e.g. California, CA…',
    viewAllStates: 'View all states →',
  };
}

export type Section8IndexStrings = {
  title: string;
  description: (count: string) => string;
  h1: string;
  lead: (count: string) => string;
  cta: string;
  browseTitle: string;
  subhead: string;
  intro: string[];
  viewAll: string;
};

export function getSection8IndexStrings(lang: Lang): Section8IndexStrings {
  if (lang === 'es') {
    return {
      title: 'Section 8 por estado y ciudad — Directorio nacional',
      description: (count) =>
        `Encuentre guías Section 8 y estimaciones para ${count} ciudades en los 50 estados. Límites de ingreso HUD, Fair Market Rents y calculadora gratuita.`,
      h1: 'Section 8 en cada ciudad de EE. UU.',
      lead: (count) =>
        `Indexamos ${count} ciudades y lugares del censo — cada uno con página local y enlace a nuestra calculadora por ZIP.`,
      cta: 'Calcular para su ZIP',
      browseTitle: 'Explorar por estado',
      subhead: 'Qué hay en cada página estatal',
      intro: [
        'El programa Housing Choice Voucher (Section 8) ayuda a hogares de muy bajos ingresos a pagar renta en vivienda privada. Las reglas de HUD son federales, pero los límites de ingreso, Fair Market Rents y listas de espera varían por condado y área metropolitana.',
        'Cada página estatal enlaza a todas las ciudades del estado con información local: cómo solicitar, autoridades de vivienda (PHA) cercanas y nuestra calculadora por ZIP para estimar elegibilidad y ayuda mensual del voucher.',
        'Seleccione su estado abajo para comenzar. Si ya conoce su código postal, puede ir directo a la calculadora.',
      ],
      viewAll: 'Ver todos los estados →',
    };
  }
  return {
    title: 'Section 8 Housing by State & City — Nationwide Directory',
    description: (count) =>
      `Find Section 8 housing guides and calculator estimates for ${count} cities and places across all 50 states. HUD income limits, Fair Market Rents, and a free eligibility calculator.`,
    h1: 'Section 8 housing in every U.S. city',
    lead: (count) =>
      `We index ${count} cities, towns, and census places — each with a local page and link to our ZIP-based calculator.`,
    cta: 'Calculate for your ZIP',
    browseTitle: 'Browse Section 8 by state',
    subhead: 'What you\'ll find on each state page',
    intro: [
      'The Housing Choice Voucher program (Section 8) helps very low-income households afford rent in private housing. HUD sets the federal rules, but income limits, Fair Market Rents, and waiting lists vary by county and metro area.',
      'Each state page links to every city in that state with local program details: how to apply, nearby Public Housing Authorities (PHAs), and our ZIP-based calculator to estimate eligibility and monthly voucher help.',
      'Pick your state below to get started. If you already know your ZIP code, you can jump straight to the calculator.',
    ],
    viewAll: 'View all states →',
  };
}

export function calcPath(lang: Lang): string {
  return lang === 'es' ? '/es/calculadora/' : '/calculator/';
}

export function homePath(lang: Lang): string {
  return lang === 'es' ? '/es/' : '/';
}

export function citiesPath(lang: Lang): string {
  return lang === 'es' ? '/es/section-8/' : '/section-8/';
}

export function guidesPath(lang: Lang): string {
  return lang === 'es' ? '/es/guias/' : '/guides/';
}

export function blogPath(lang: Lang): string {
  return lang === 'es' ? '/es/blog/' : '/blog/';
}

export function guideSlugPath(lang: Lang, slug: string): string {
  return `${guidesPath(lang)}${slug}/`;
}

export function statePath(lang: Lang, stateSlug: string): string {
  return `${citiesPath(lang)}${stateSlug}/`;
}

export function cityPath(lang: Lang, stateSlug: string, placeSlug: string): string {
  return `${citiesPath(lang)}${stateSlug}/${placeSlug}/`;
}

/** Link to the equivalent page in the other language. */
export function alternateLangPath(pathname: string, current: Lang): string {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const toEs = current === 'en';

  if (toEs) {
    if (normalized === '/' || normalized === '') return '/es/';
    if (normalized.startsWith('/calculator')) return '/es/calculadora/';
    if (normalized.startsWith('/guides/')) {
      const slug = normalized.replace('/guides/', '').replace(/\/$/, '');
      return slug ? `/es/guias/${slug}/` : '/es/guias/';
    }
    if (normalized.startsWith('/section-8/')) {
      const rest = normalized.replace('/section-8/', '');
      return rest ? `/es/section-8/${rest}` : '/es/section-8/';
    }
    return '/es/';
  }

  if (normalized === '/es/' || normalized === '/es') return '/';
  if (normalized.startsWith('/es/calculadora')) return '/calculator/';
  if (normalized.startsWith('/es/guias/')) {
    const slug = normalized.replace('/es/guias/', '').replace(/\/$/, '');
    return slug ? `/guides/${slug}/` : '/guides/';
  }
  if (normalized.startsWith('/es/section-8/')) {
    const rest = normalized.replace('/es/section-8/', '');
    return rest ? `/section-8/${rest}` : '/section-8/';
  }
  return '/';
}
