import { site } from '../data/site';
import { works, slug } from '../data/works';

export function GET() {
  const paths = ['/', '/work/', '/info/', ...works.map((w) => `/work/${slug(w)}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${new URL(p, site.url).href}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
