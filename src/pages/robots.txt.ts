import type { APIRoute } from 'astro';

// Dynamic so the Sitemap URL follows the configured `site` (survives the
// staging → apex cutover automatically).
export const GET: APIRoute = ({ site }) => {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${new URL('sitemap-index.xml', site).href}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
