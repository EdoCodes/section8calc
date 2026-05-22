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
  navCalculator: string;
  navCities: string;
  navGuides: string;
  navCta: string;
  langSwitch: string;
  langSwitchLabel: string;
  footerDisclaimer: string;
  calcLink: string;
  guidesLink: string;
};

export function getSiteStrings(lang: Lang): SiteStrings {
  if (lang === 'es') {
    return {
      lang: 'es',
      siteName: 'Calculadora Section 8',
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
    };
  }
  return {
    lang: 'en',
    siteName: 'Section 8 Calculator',
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
  };
}

export function calcPath(lang: Lang): string {
  return lang === 'es' ? '/es/calculadora/' : '/calculator/';
}

export function homePath(lang: Lang): string {
  return lang === 'es' ? '/es/' : '/';
}

/** Link to the equivalent page in the other language. */
export function alternateLangPath(pathname: string, current: Lang): string {
  const toEs = current === 'en';
  if (toEs) {
    if (pathname.startsWith('/calculator')) return '/es/calculadora/';
    if (pathname === '/' || pathname === '') return '/es/';
    return '/es/calculadora/';
  }
  if (pathname.startsWith('/es/calculadora')) return '/calculator/';
  if (pathname === '/es' || pathname === '/es/') return '/';
  return '/calculator/';
}
