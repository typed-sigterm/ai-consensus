import entitiesRaw from '~/assets/entities.json';

export type EntityType = 'company' | 'product';

export interface Entity {
  /** Explicit lookup key when it can't be derived from the name. */
  id?: string
  name: string
  type?: EntityType
  url?: string
  logo?: string
  byCompany?: string
}

export interface TrackData {
  sort: number
  title: string
  description: string
  source: string
  yesLabel: string
  noLabel: string
  participants: Record<string, boolean>
}

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const entityMap = new Map<string, Entity>();
for (const entity of entitiesRaw as Entity[]) {
  entityMap.set(slugify(entity.name), entity);
  entityMap.set(entity.name, entity);
  if (entity.id)
    entityMap.set(entity.id, entity);
}

export function getEntity(key: string): Entity {
  if (!entityMap.has(key))
    throw new Error(`Unknown entity: ${key}`);
  return entityMap.get(key)!;
}

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
