import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://venusfashion.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/my-orders', '/admin'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
