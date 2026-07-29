export type EntityType = 'company' | 'product';

export interface Entity {
  id: string
  name: string
  type: EntityType
  url?: string
  logo?: string
  by?: string
}
