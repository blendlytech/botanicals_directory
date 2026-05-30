import { MetadataRoute } from 'next';
import { supabaseAdmin } from '@rpv/supabase/admin';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.rareplantvendors.com';

  // Static routes
  const routes = [
    '',
    '/about',
    '/for-vendors',
    '/vendors',
    '/terms',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Fetch all verified vendors for dynamic routes
    const { data: vendors, error } = await supabaseAdmin
      .from('vendors')
      .select('slug, created_at')
      .eq('is_verified', true);

    if (error) {
      console.error('Failed to fetch vendors for sitemap:', error);
      return routes;
    }

    const vendorRoutes = vendors.map((vendor: any) => ({
      url: `${baseUrl}/vendors/${vendor.slug}`,
      lastModified: vendor.created_at || new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    return [...routes, ...vendorRoutes];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return routes;
  }
}
