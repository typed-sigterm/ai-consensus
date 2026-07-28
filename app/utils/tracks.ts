import companiesRaw from '~/assets/companies.json';
import productsRaw from '~/assets/products.json';

export interface Company {
  name: string
  url: string
  logo?: string
}

export interface Product {
  name: string
  url?: string
  logo?: string
  company?: string
}

export interface TrackData {
  sort: number
  title: string
  description: string
  source: string
  subject: 'companies' | 'products'
  yesLabel: string
  noLabel: string
  participants: Record<string, boolean>
}

export const companies = new Map((companiesRaw as Company[]).map(c => [c.name, c]));
export const products = new Map((productsRaw as Product[]).map(p => [p.name, p]));

export const tracks: Record<string, TrackData> = Object.fromEntries(
  Object.entries(
    import.meta.glob<TrackData>(
      '~/assets/tracks/*.json',
      { eager: true, import: 'default' },
    ),
  )
    .sort((a, b) => a[1].sort - b[1].sort)
    .map(([k, v]) => [k.replace(/^.*\/|\.json$/g, ''), v]),
);
