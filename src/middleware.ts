export { auth as middleware } from '@/modules/auth';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sitemap.xml|robots.txt).*)']
};
