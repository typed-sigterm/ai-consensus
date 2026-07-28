import type { Entity } from '../shared/utils/data';
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = 'https://www.microsoft.com/en-us/corporate-responsibility/topics/open-weight/';
const entitiesPath = join(__dirname, '../app/assets/entities.json');
const trackPath = join(__dirname, '../app/assets/tracks/open-weights-letter.json');

const $ = load(await (await fetch(url)).text());
const existing: Entity[] = JSON.parse(readFileSync(entitiesPath, 'utf-8'));
const existingMap = existing.reduce<Record<string, Entity>>((acc, e) => {
  acc[e.name] = e;
  return acc;
}, {});
const adding: Entity[] = [];

for (const el of $('.wp-block-image img')) {
  const name = el.attribs.alt?.trim()?.replace(' logo', '').replace(' Logo', '');
  const logo = el.attribs.src;
  if (!name || !logo) {
    console.error('Missing name or logo in', el);
    continue;
  }
  const found = existingMap[name];
  if (found) {
    if (!found.logo)
      found.logo = logo;
    continue;
  }
  const id = name
    .replace(/([A-Z][a-z]|[a-z])([A-Z])/g, '$1-$2')
    .replace(/ /g, '-')
    .toLowerCase()
    .replace(/^-+/, '');
  adding.push({ type: 'company', id, name, logo });
}

const entities = [...existing, ...adding].sort((a, b) => a.name.localeCompare(b.name));
writeFileSync(entitiesPath, JSON.stringify(entities, null, 2));
appendFileSync(entitiesPath, '\n');

const track = JSON.parse(readFileSync(trackPath, 'utf-8'));
track.participants = adding.reduce<Record<string, boolean>>((acc, e) => {
  acc[e.id] = true;
  return acc;
}, track.participants);
track.participants = Object.fromEntries(
  Object.entries(track.participants).sort((a, b) => a[0].localeCompare(b[0])),
);
writeFileSync(trackPath, JSON.stringify(track, null, 2));
appendFileSync(trackPath, '\n');
