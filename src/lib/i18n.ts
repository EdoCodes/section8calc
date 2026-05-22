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
  paymentStandard: string;
  maxHelp: string;
  fmrBasis: string;
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
  annualIncome: 'Annual gross household income',
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
  paymentStandard: 'Payment standard',
  maxHelp: 'Max voucher help',
  fmrBasis: 'FMR basis',
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
  annualIncome: 'Ingreso bruto anual del hogar',
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
  paymentStandard: 'Estándar de pago',
  maxHelp: 'Ayuda máxima del voucher',
  fmrBasis: 'Base FMR',
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

export type SiteStrings = {
  lang: Lang;
  siteName: string;
  siteTagline: string;
  navCalculator: string;
  navCities: string;
  navGuides: string;
  navCta: string;
  langSwitch: string;
  langSwitchLabel: string;
  footerDisclaimer: string;
  calcLink: string;
  guidesLink: string;
  citiesLink: string;
};

export function getSiteStrings(lang: Lang): SiteStrings {
  if (lang === 'es') {
    return {
      lang: 'es',
      siteName: 'Calculadora Section 8',
      siteTagline: 'Elegibilidad y renta con voucher',
      navCalculator: 'Calculadora',
      navCities: 'Por ciudad',
      navGuides: 'Guías',
      navCta: 'Ver elegibilidad',
      langSwitch: 'English',
      langSwitchLabel: 'Cambiar a inglés',
      footerDisclaimer:
        'Este sitio ofrece estimaciones educativas basadas en límites de ingreso y FMR de HUD. No está afiliado a HUD ni a su PHA local. Solicite siempre a través de su PHA.',
      calcLink: 'Calculadora Section 8',
      guidesLink: 'Guías de vivienda',
      citiesLink: 'Directorio por ciudad',
    };
  }
  return {
    lang: 'en',
    siteName: 'Section 8 Calculator',
    siteTagline: 'Voucher eligibility & rent estimates',
    navCalculator: 'Calculator',
    navCities: 'By city',
    navGuides: 'Guides',
    navCta: 'Check eligibility',
    langSwitch: 'Español',
    langSwitchLabel: 'Switch to Spanish',
    footerDisclaimer:
      'This site provides educational estimates based on HUD income limits and Fair Market Rents. It is not affiliated with HUD or your local Public Housing Authority. Always apply through your PHA for official determinations.',
    calcLink: 'Section 8 calculator',
    guidesLink: 'Housing guides',
    citiesLink: 'Browse by city',
  };
}

export type HomeStrings = {
  domain: string;
  heroLine1: string;
  heroAccent: string;
  heroLine2: string;
  heroLead: string;
  searchPlaceholder: string;
  searchButton: string;
  tools: { href: string; title: string; subtitle: string; iconClass: string; emoji: string }[];
  featureTitle1: string;
  featureBody1: string[];
  featureTitle2: string;
  featureBody2: string;
  featureLink2: string;
  guidesTitle: string;
  allGuides: string;
};

export function getHomeStrings(lang: Lang): HomeStrings {
  const calc = calcPath(lang);
  const cities = citiesPath(lang);
  const guides = guidesPath(lang);
  if (lang === 'es') {
    return {
      domain: 'section8calculator.com',
      heroLine1: 'Su estimación Section 8 en',
      heroAccent: '3',
      heroLine2: 'pasos gratuitos',
      heroLead:
        'Ingrese su ZIP, confirme ciudad y condado, y vea límites de ingreso HUD y ayuda estimada del voucher — los mismos datos que usan las autoridades de vivienda.',
      searchPlaceholder: 'Ingrese código postal (ZIP)',
      searchButton: 'Calcular',
      tools: [
        { href: calc, title: 'Calculadora principal', subtitle: 'ZIP y elegibilidad', iconClass: 'home-calc-card__icon--orange', emoji: '🏠' },
        { href: cities, title: 'Por ciudad', subtitle: '31,000+ lugares', iconClass: 'home-calc-card__icon--navy', emoji: '🗺️' },
        { href: guides, title: 'Guías', subtitle: 'Vouchers y listas', iconClass: 'home-calc-card__icon--teal', emoji: '📘' },
        { href: `${calc}#section8-calculator`, title: 'Límites de ingreso', subtitle: 'Datos HUD', iconClass: 'home-calc-card__icon--slate', emoji: '📊' },
      ],
      featureTitle1: 'Para inquilinos y buscadores',
      featureBody1: [
        'Búsqueda por ZIP con ciudad y condado confirmados',
        'Verificación de límites de ingreso muy bajo y bajo',
        'Estimación de su parte y subvención máxima del voucher',
        'Renta opcional para ver pagos sobre el estándar',
      ],
      featureTitle2: 'Guías en español',
      featureBody2:
        'Artículos sobre solicitudes Section 8, listas de espera, límites de ingreso y estándares de pago — cada uno enlaza a la calculadora.',
      featureLink2: 'Ver todas las guías →',
      guidesTitle: 'Guías populares Section 8',
      allGuides: 'Todas las guías',
    };
  }
  return {
    domain: 'section8calculator.com',
    heroLine1: 'Your Section 8 estimate in',
    heroAccent: '3',
    heroLine2: 'free steps',
    heroLead:
      'Enter your ZIP, confirm city and county, and see HUD income limits and estimated voucher help — the same data housing authorities use.',
    searchPlaceholder: 'Enter ZIP code',
    searchButton: 'Calculate',
    tools: [
      { href: calc, title: 'Main calculator', subtitle: 'ZIP & eligibility', iconClass: 'home-calc-card__icon--orange', emoji: '🏠' },
      { href: cities, title: 'By city', subtitle: '31,000+ places', iconClass: 'home-calc-card__icon--navy', emoji: '🗺️' },
      { href: guides, title: 'Guides', subtitle: 'Vouchers & waiting lists', iconClass: 'home-calc-card__icon--teal', emoji: '📘' },
      { href: `${calc}#section8-calculator`, title: 'Income limits', subtitle: 'HUD data', iconClass: 'home-calc-card__icon--slate', emoji: '📊' },
    ],
    featureTitle1: 'Built for searchers & renters',
    featureBody1: [
      'ZIP-first lookup fills city and county dropdowns',
      'Very low & low income limit checks by household size',
      'Estimated tenant share and maximum voucher subsidy',
      'Optional rent input to see payment above the standard',
    ],
    featureTitle2: 'Housing guides hub',
    featureBody2:
      'Guides on Section 8 applications, waiting lists, income limits, and payment standards — each links to the calculator.',
    featureLink2: 'Browse all guides →',
    guidesTitle: 'Popular Section 8 guides',
    allGuides: 'All guides',
  };
}

export type Section8IndexStrings = {
  title: string;
  description: (count: string) => string;
  h1: string;
  lead: (count: string) => string;
  cta: string;
  browseTitle: string;
};

export function getSection8IndexStrings(lang: Lang): Section8IndexStrings {
  if (lang === 'es') {
    return {
      title: 'Section 8 por estado y ciudad — Directorio nacional',
      description: (count) =>
        `Encuentre guías Section 8 y estimaciones para ${count} ciudades en los 50 estados.`,
      h1: 'Section 8 en cada ciudad de EE. UU.',
      lead: (count) =>
        `Indexamos ${count} ciudades y lugares del censo — cada uno con página local y enlace a nuestra calculadora por ZIP.`,
      cta: 'Calcular para su ZIP',
      browseTitle: 'Explorar por estado',
    };
  }
  return {
    title: 'Section 8 Housing by State & City — Nationwide Directory',
    description: (count) =>
      `Find Section 8 housing guides and calculator estimates for ${count} cities and places across all 50 states.`,
    h1: 'Section 8 housing in every U.S. city',
    lead: (count) =>
      `We index ${count} cities, towns, and census places — each with a local page and link to our ZIP-based calculator.`,
    cta: 'Calculate for your ZIP',
    browseTitle: 'Browse by state',
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
