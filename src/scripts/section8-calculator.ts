import { trackEvent } from '../lib/analytics';
import type { CalcClientStrings } from '../lib/i18n';

export function initSection8Calculator(c: CalcClientStrings) {
  const root = document.getElementById('section8-calculator');
  const form = document.getElementById('calc-form');
  const zipInput = document.getElementById('zip') as HTMLInputElement | null;
  const zipLookupBtn = document.getElementById('zip-lookup-btn') as HTMLButtonElement | null;
  const citySelect = document.getElementById('city') as HTMLSelectElement | null;
  const countySelect = document.getElementById('county') as HTMLSelectElement | null;
  const locationFields = document.getElementById('location-fields');
  const statusEl = document.getElementById('location-status');
  const resultsEl = document.getElementById('calc-results');
  const placeholderEl = document.getElementById('calc-results-placeholder');
  const submitBtn = document.getElementById('calc-submit') as HTMLButtonElement | null;
  const submitHint = document.getElementById('calc-submit-hint');
  const stepsEl = document.getElementById('calc-steps');
  const resultsSidebar = document.getElementById('calc-results-sidebar');
  const householdSizeEl = document.getElementById('householdSize') as HTMLSelectElement | null;
  const incomeExampleEl = document.getElementById('income-example-hint');
  const resultActionsEl = document.getElementById('calc-result-actions');
  const printBtn = document.getElementById('calc-print-btn');
  const pdfBtn = document.getElementById('calc-pdf-btn');
  const pdfHintEl = document.getElementById('calc-pdf-hint');

  if (
    !root ||
    !form ||
    !zipInput ||
    !zipLookupBtn ||
    !citySelect ||
    !countySelect ||
    !statusEl ||
    !resultsEl ||
    !placeholderEl ||
    !submitBtn ||
    !submitHint
  ) {
    console.error('[section8-calculator] Missing required DOM nodes');
    return;
  }

  const plainHeadlines: Record<string, string> = {
    eligible: c.eligiblePlain,
    possibly_eligible: c.possiblyEligiblePlain,
    not_eligible: c.notEligiblePlain,
  };

  const trafficLabels: Record<string, string> = {
    eligible: c.trafficGood,
    possibly_eligible: c.trafficMaybe,
    not_eligible: c.trafficUnlikely,
  };

  let lookupCache: {
    zip: string;
    places: Array<{ city: string; stateAbbr: string }>;
    counties: Array<{ entityId: string; name: string }>;
  } | null = null;
  let zipDebounce: ReturnType<typeof setTimeout> | undefined;
  let lastTrackedZip = '';
  let zipLookupInFlight = false;

  function tpl(template: string, vars: Record<string, string | number>) {
    return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
  }

  trackEvent('calculator_view', { page_path: window.location.pathname, lang: c.lang });

  function formatMoney(n: number) {
    return new Intl.NumberFormat(c.locale, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n);
  }

  function setStatus(msg: string, visible = true, isError = false, isSuccess = false) {
    statusEl.textContent = msg;
    statusEl.classList.toggle('hidden', !visible);
    statusEl.classList.toggle('is-error', isError);
    statusEl.classList.toggle('is-success', isSuccess);
  }

  function setStepActive(step: number) {
    stepsEl?.querySelectorAll('.calc-step-pill').forEach((pill) => {
      const n = Number(pill.getAttribute('data-step'));
      pill.classList.toggle('is-active', n === step);
      pill.classList.toggle('is-done', n < step);
    });
  }

  function updateSubmitState() {
    const incomeEl = document.getElementById('annualGrossIncome') as HTMLInputElement | null;
    const income = Number(incomeEl?.value);
    const ready = Boolean(lookupCache) && Number.isFinite(income) && income >= 0;
    submitBtn.disabled = !ready;
    if (lookupCache && ready) {
      submitHint.textContent = c.locationReady;
      submitHint.classList.remove('is-error');
    } else if (!lookupCache) {
      submitHint.textContent = c.zipFirst;
    } else {
      submitHint.textContent = '';
    }
  }

  function showResults(showActions = false) {
    placeholderEl.classList.add('hidden');
    resultsEl.classList.remove('hidden');
    setStepActive(3);
    resultActionsEl?.classList.toggle('hidden', !showActions);
    resultsSidebar?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function updateIncomeExample() {
    if (!householdSizeEl || !incomeExampleEl) return;
    const hint = c.incomeExamples[householdSizeEl.value];
    incomeExampleEl.textContent = hint ?? '';
    incomeExampleEl.classList.toggle('hidden', !hint);
  }

  function trafficBadgeHtml(statusClass: string) {
    const label = trafficLabels[statusClass];
    if (!label) return '';
    return `
      <div class="result-traffic result-traffic--${statusClass}" role="status">
        <span class="result-traffic__dot" aria-hidden="true"></span>
        <span class="result-traffic__label">${label}</span>
      </div>`;
  }

  function printResults(showPdfHint = false) {
    const prevTitle = document.title;
    document.title = c.printTitle;
    document.body.classList.add('calc-print-mode');
    if (showPdfHint) pdfHintEl?.classList.remove('hidden');
    const cleanup = () => {
      document.body.classList.remove('calc-print-mode');
      document.title = prevTitle;
      pdfHintEl?.classList.add('hidden');
    };
    window.addEventListener('afterprint', cleanup, { once: true });
    window.print();
  }

  householdSizeEl?.addEventListener('change', updateIncomeExample);
  updateIncomeExample();

  printBtn?.addEventListener('click', () => printResults(false));
  pdfBtn?.addEventListener('click', () => printResults(true));

  async function parseJsonResponse(res: Response) {
    const text = await res.text();
    try {
      return JSON.parse(text) as Record<string, unknown>;
    } catch {
      throw new Error(c.apiUnavailable);
    }
  }

  function fillLocation(data: NonNullable<typeof lookupCache>) {
    lookupCache = data;
    citySelect.innerHTML = '';
    countySelect.innerHTML = '';

    for (const p of data.places) {
      const opt = document.createElement('option');
      opt.value = p.city;
      opt.textContent = `${p.city}, ${p.stateAbbr}`;
      opt.dataset.stateAbbr = p.stateAbbr;
      citySelect.appendChild(opt);
    }

    for (const county of data.counties) {
      const opt = document.createElement('option');
      opt.value = county.entityId;
      opt.textContent = county.name;
      opt.dataset.countyName = county.name;
      countySelect.appendChild(opt);
    }

    citySelect.disabled = false;
    countySelect.disabled = false;
    locationFields?.classList.add('is-ready');

    setStatus(
      tpl(c.tplLocationFound, {
        places: data.places.length,
        counties: data.counties.length,
        zip: data.zip,
      }),
      true,
      false,
      true,
    );

    setStepActive(2);
    updateSubmitState();

    if (data.zip !== lastTrackedZip) {
      lastTrackedZip = data.zip;
      trackEvent('zip_lookup_success', {
        zip: data.zip,
        state: data.places[0]?.stateAbbr ?? '',
        place_count: data.places.length,
        county_count: data.counties.length,
      });
    }
  }

  async function lookupZipCode(zip: string, source = 'auto') {
    if (!/^\d{5}$/.test(zip)) {
      setStatus(c.zipFirst, true, true);
      return;
    }
    if (zipLookupInFlight) return;
    zipLookupInFlight = true;
    zipLookupBtn.disabled = true;
    zipLookupBtn.textContent = c.zipLooking;
    setStatus(c.lookingUp);

    try {
      trackEvent('zip_lookup_started', { zip, source });
      const res = await fetch(`/api/location/zip?zip=${encodeURIComponent(zip)}`);
      const data = await parseJsonResponse(res);
      if (!res.ok) {
        trackEvent('zip_lookup_error', { zip, error_message: String(data.error ?? 'failed') });
        throw new Error(String(data.error ?? c.noZip));
      }
      fillLocation(data as NonNullable<typeof lookupCache>);
    } catch (err) {
      lookupCache = null;
      citySelect.disabled = true;
      countySelect.disabled = true;
      locationFields?.classList.remove('is-ready');
      const message = err instanceof Error ? err.message : c.noZip;
      setStatus(message, true, true);
      updateSubmitState();
    } finally {
      zipLookupInFlight = false;
      zipLookupBtn.disabled = false;
      zipLookupBtn.textContent = c.zipLookupBtn;
    }
  }

  function scheduleZipLookup() {
    const zip = zipInput.value.replace(/\D/g, '').slice(0, 5);
    zipInput.value = zip;
    lookupCache = null;
    locationFields?.classList.remove('is-ready');
    updateSubmitState();
    if (zip.length !== 5) {
      citySelect.disabled = true;
      countySelect.disabled = true;
      setStatus('', false);
      setStepActive(1);
      return;
    }
    clearTimeout(zipDebounce);
    zipDebounce = setTimeout(() => lookupZipCode(zip, 'debounce'), 350);
  }

  zipInput.addEventListener('input', scheduleZipLookup);
  zipInput.addEventListener('blur', () => {
    const zip = zipInput.value.replace(/\D/g, '').slice(0, 5);
    if (zip.length === 5 && !lookupCache) lookupZipCode(zip, 'blur');
  });
  zipInput.addEventListener('paste', () => setTimeout(scheduleZipLookup, 0));
  zipInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const zip = zipInput.value.replace(/\D/g, '').slice(0, 5);
      if (zip.length === 5) lookupZipCode(zip, 'enter');
    }
  });
  zipLookupBtn.addEventListener('click', () => {
    const zip = zipInput.value.replace(/\D/g, '').slice(0, 5);
    lookupZipCode(zip, 'button');
  });

  document.getElementById('annualGrossIncome')?.addEventListener('input', updateSubmitState);

  const zipFromUrl = new URLSearchParams(window.location.search).get('zip')?.replace(/\D/g, '').slice(0, 5);
  if (zipFromUrl && zipFromUrl.length === 5) {
    zipInput.value = zipFromUrl;
    lookupZipCode(zipFromUrl, 'url');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!lookupCache) {
      setStatus(c.zipFirst, true, true);
      zipInput.focus();
      trackEvent('calculate_blocked', { reason: 'no_zip_lookup' });
      return;
    }

    const countyOpt = countySelect.selectedOptions[0];
    const cityOpt = citySelect.selectedOptions[0];
    const monthlyRentInput = document.getElementById('monthlyRent') as HTMLInputElement | null;

    trackEvent('calculate_click', {
      zip: lookupCache.zip,
      state: cityOpt?.dataset.stateAbbr ?? '',
      household_size: Number((document.getElementById('householdSize') as HTMLSelectElement).value),
      bedrooms: Number((document.getElementById('bedrooms') as HTMLSelectElement).value),
      has_rent: Boolean(monthlyRentInput?.value),
    });

    submitBtn.disabled = true;
    submitBtn.textContent = c.calculating;
    form.classList.add('loading');
    resultsEl.classList.add('hidden');
    placeholderEl.classList.remove('hidden');
    resultActionsEl?.classList.add('hidden');

    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          zip: lookupCache.zip,
          city: cityOpt?.value,
          county: countyOpt?.dataset.countyName,
          stateAbbr: cityOpt?.dataset.stateAbbr,
          entityId: countyOpt?.value,
          annualGrossIncome: Number((document.getElementById('annualGrossIncome') as HTMLInputElement).value),
          annualDeductions: Number((document.getElementById('annualDeductions') as HTMLInputElement).value) || 0,
          householdSize: Number((document.getElementById('householdSize') as HTMLSelectElement).value),
          bedrooms: Number((document.getElementById('bedrooms') as HTMLSelectElement).value),
          monthlyRent: monthlyRentInput?.value ? Number(monthlyRentInput.value) : undefined,
        }),
      });

      const data = await parseJsonResponse(res);
      if (!res.ok) throw new Error(String(data.error ?? c.calcFailed));

      const eligibility = data.eligibility as {
        status: string;
        label: string;
        veryLowLimit: number;
      };
      const subsidy = data.subsidy as {
        totalTenantPayment: number;
        paymentStandard: number;
        maxMonthlySubsidy: number;
        actualHap?: number;
        rentAboveStandard?: number;
      };
      const incomeLimits = data.incomeLimits as { areaName: string; year: number };
      const fmr = data.fmr as { bedrooms: number; fmrAmount: number };
      const disclaimer = String(data.disclaimer ?? '');

      const statusClass = eligibility.status;
      const headline = plainHeadlines[statusClass] ?? eligibility.label;
      const trafficHtml = trafficBadgeHtml(statusClass);
      const ttpAmount = formatMoney(subsidy.totalTenantPayment);

      let rentNote = '';
      if (subsidy.actualHap != null) {
        rentNote = `<p class="rent-note">${tpl(c.tplWithRent, { amount: formatMoney(subsidy.actualHap) })}</p>`;
        if (subsidy.rentAboveStandard) {
          rentNote += `<p class="warn">${tpl(c.tplRentAbove, { amount: formatMoney(subsidy.rentAboveStandard) })}</p>`;
        }
      }

      resultsEl.dataset.status = statusClass;
      resultsEl.innerHTML = `
        <div class="result-ttp-hero" role="region" aria-label="${c.yourSharePlain}">
          <span class="result-ttp-hero__badge">${c.ttpFocusBadge}</span>
          <p class="result-ttp-hero__label">${c.yourSharePlain}</p>
          <p class="result-ttp-hero__value">${ttpAmount}<span class="result-ttp-hero__per">${c.perMonth}</span></p>
          <p class="result-ttp-hero__hint">${c.yourShareHint}</p>
          <p class="result-ttp-hero__abbr"><abbr title="Total Tenant Payment">TTP</abbr> · ${c.yourShare}</p>
        </div>
        ${trafficHtml}
        <p class="result-headline">${headline}</p>
        <p class="result-area">${c.incomeLimitPlain}: <strong>${formatMoney(eligibility.veryLowLimit)}${c.perYear}</strong><br /><span class="result-area__place">${incomeLimits.areaName} (HUD ${incomeLimits.year})</span></p>
        <div class="result-next-steps">
          <h4 class="result-next-steps__title">${c.nextStepsTitle}</h4>
          <p class="result-next-steps__lead">${c.nextStepsLead}</p>
          <a class="result-next-steps__link" href="${c.nextStepsHref}">${c.nextStepsLink}</a>
        </div>
        <details class="result-details">
          <summary>${c.detailsSummary}</summary>
          <div class="stat-grid stat-grid--secondary">
            <div class="stat">
              <p class="label">${c.maxHelpPlain}</p>
              <p class="value">${formatMoney(subsidy.maxMonthlySubsidy)}${c.perMonth}</p>
              <p class="stat-hint">${c.maxHelpHint}</p>
            </div>
            <div class="stat">
              <p class="label">${c.paymentStandardPlain} (${fmr.bedrooms} BR)</p>
              <p class="value">${formatMoney(subsidy.paymentStandard)}${c.perMonth}</p>
              <p class="stat-hint">${c.paymentStandardHint}</p>
            </div>
            <div class="stat">
              <p class="label">${c.fmrBasisPlain}</p>
              <p class="value">${formatMoney(fmr.fmrAmount)}${c.perMonth}</p>
              <p class="stat-hint">${c.fmrBasisHint}</p>
            </div>
          </div>
        </details>
        ${rentNote}
        <p class="result-disclaimer"><small>${disclaimer}</small></p>
      `;
      showResults(true);

      trackEvent('calculate_success', {
        zip: lookupCache.zip,
        state: cityOpt?.dataset.stateAbbr ?? '',
        eligibility: eligibility.status,
        max_subsidy: subsidy.maxMonthlySubsidy,
        ttp: subsidy.totalTenantPayment,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : c.calcFailed;
      trackEvent('calculate_error', { zip: lookupCache?.zip ?? '', error_message: message.slice(0, 120) });
      resultsEl.dataset.status = 'error';
      resultsEl.innerHTML = `<p class="result-headline">${message}</p>`;
      showResults(false);
    } finally {
      submitBtn.textContent = c.submitLabel;
      form.classList.remove('loading');
      updateSubmitState();
    }
  });

  updateSubmitState();
}
