export type CalculationInput = {
  annualGrossIncome: number;
  householdSize: number;
  bedrooms: number;
  /** Annual deductions applied before 30% rule (elderly/disabled, childcare, etc.) */
  annualDeductions?: number;
  /** Monthly rent if unit selected; optional for max-subsidy-only estimate */
  monthlyRent?: number;
  /** PHA payment standard as % of FMR (90–110). Default 100. */
  paymentStandardPercent?: number;
  /** PHA minimum rent floor ($0–$50). Default $50. */
  phaMinimumRent?: number;
};

export type EligibilityResult = {
  status: 'eligible' | 'possibly_eligible' | 'not_eligible';
  label: string;
  veryLowLimit: number;
  lowLimit: number;
};

export type SubsidyEstimate = {
  monthlyGrossIncome: number;
  monthlyAdjustedIncome: number;
  totalTenantPayment: number;
  paymentStandard: number;
  maxMonthlySubsidy: number;
  estimatedTenantShare: number;
  actualHap?: number;
  rentAboveStandard?: number;
};

export function getIncomeLimit(
  limits: number[],
  householdSize: number,
): number {
  const idx = Math.min(Math.max(householdSize, 1), limits.length) - 1;
  return limits[idx] ?? limits[limits.length - 1] ?? 0;
}

export function assessEligibility(
  annualIncome: number,
  householdSize: number,
  veryLow: number[],
  low: number[],
): EligibilityResult {
  const veryLowLimit = getIncomeLimit(veryLow, householdSize);
  const lowLimit = getIncomeLimit(low, householdSize);

  if (annualIncome <= veryLowLimit) {
    return {
      status: 'eligible',
      label: 'Likely meets very low income requirement for Housing Choice Vouchers',
      veryLowLimit,
      lowLimit,
    };
  }
  if (annualIncome <= lowLimit) {
    return {
      status: 'possibly_eligible',
      label: 'Income is above very low but within low income limits — PHA preferences may apply',
      veryLowLimit,
      lowLimit,
    };
  }
  return {
    status: 'not_eligible',
    label: 'Income appears above HUD low income limits for this area',
    veryLowLimit,
    lowLimit,
  };
}

export function computeSubsidy(
  input: CalculationInput,
  fmrForBedrooms: number,
): SubsidyEstimate {
  const deductions = input.annualDeductions ?? 0;
  const adjustedAnnual = Math.max(0, input.annualGrossIncome - deductions);
  const monthlyGross = input.annualGrossIncome / 12;
  const monthlyAdjusted = adjustedAnnual / 12;

  const pct = (input.paymentStandardPercent ?? 100) / 100;
  const paymentStandard = Math.round(fmrForBedrooms * pct);

  const phaMin = input.phaMinimumRent ?? 50;

  const thirtyPct = monthlyAdjusted * 0.3;
  const tenPct = monthlyGross * 0.1;
  const totalTenantPayment = Math.round(Math.max(thirtyPct, tenPct, phaMin));

  const maxMonthlySubsidy = Math.max(0, paymentStandard - totalTenantPayment);

  let actualHap: number | undefined;
  let rentAboveStandard: number | undefined;

  if (input.monthlyRent != null && input.monthlyRent > 0) {
    const cap = Math.min(paymentStandard, input.monthlyRent);
    actualHap = Math.max(0, cap - totalTenantPayment);
    if (input.monthlyRent > paymentStandard) {
      rentAboveStandard = input.monthlyRent - paymentStandard;
    }
  }

  return {
    monthlyGrossIncome: Math.round(monthlyGross),
    monthlyAdjustedIncome: Math.round(monthlyAdjusted),
    totalTenantPayment,
    paymentStandard,
    maxMonthlySubsidy,
    estimatedTenantShare: totalTenantPayment,
    actualHap,
    rentAboveStandard,
  };
}

export function fmrForBedrooms(
  rows: { bedrooms: number; fmr: number }[],
  bedrooms: number,
): number {
  const exact = rows.find((r) => r.bedrooms === bedrooms);
  if (exact) return exact.fmr;
  const two = rows.find((r) => r.bedrooms === 2);
  return two?.fmr ?? rows[0]?.fmr ?? 0;
}
