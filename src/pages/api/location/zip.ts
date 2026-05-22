import type { APIRoute } from 'astro';
import { isValidZip, lookupZip } from '../../../lib/geo';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const zip = url.searchParams.get('zip')?.trim() ?? '';

  if (!isValidZip(zip)) {
    return new Response(
      JSON.stringify({ error: 'Enter a valid 5-digit U.S. ZIP code.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  try {
    const result = await lookupZip(zip);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'ZIP lookup failed.';
    return new Response(JSON.stringify({ error: message }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
