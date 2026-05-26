import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://venusfashion.com';

  // Base routes
  const routes = [
    '',
    '/products',
    '/cart',
    '/login',
    '/signup',
    '/my-orders',
    '/contact-us',
    '/privacy-policy',
    '/terms-and-conditions',
    '/cancellation-and-refund',
    '/shipping-and-delivery',
    '/return-and-exchange',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic categories
  const categories = ['Chaniya Choli', 'Kurti Pair', 'Gown Sets'];
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/products/category/${cat.toLowerCase().replace(/ /g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic occasions
  const occasions = ['NEW IN', 'BEST SELLER', 'FESTIVE COLLECTION', 'WORK WEAR', 'SUMMER MOMENTS', 'EVERYDAY EASE'];
  const occasionRoutes = occasions.map((occ) => ({
    url: `${baseUrl}/products/occasion/${occ.toLowerCase().replace(/ /g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic products
  let productRoutes: any[] = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const res = await fetch(`${apiUrl}/api/products`);
    if (res.ok) {
      const data = await res.json();
      const products = Array.isArray(data) ? data : (data.data || []);
      productRoutes = products.map((product: any) => ({
        url: `${baseUrl}/products/${product._id}`,
        lastModified: new Date(product.updatedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Sitemap dynamic product generation error:", error);
  }

  return [...routes, ...categoryRoutes, ...occasionRoutes, ...productRoutes];
}
