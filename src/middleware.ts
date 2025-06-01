export { auth as middleware } from '@/modules/auth';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js|icon-192x192.png|icon-512x512.png|sitemap.xml|robots.txt).*)']
};
