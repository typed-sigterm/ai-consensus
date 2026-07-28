import type { Entity } from '#shared/utils/data';
import entitiesRaw from '~/assets/entities.json';

export interface TrackData {
  sort: number
  title: string
  description: string
  source: string
  yesLabel: string
  noLabel: string
  participants: Record<string, boolean>
}

const entityMap = new Map<string, Entity>();
for (const entity of entitiesRaw as Entity[])
  entityMap.set(entity.id, entity);

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
