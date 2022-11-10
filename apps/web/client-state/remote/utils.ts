import type { MseCard, MseCardSet, Database } from '@mse/types';
import { MseCardSetWithCards } from '@mse/types/src/card';
export { Database };
import { camelCase, snakeCase } from 'change-case';
export type DatabaseCardRow = Database['public']['Tables']['cards']['Row'];
export type DatabaseCardInsert =
  Database['public']['Tables']['cards']['Insert'];
export type DatabaseCardUpdate =
  Database['public']['Tables']['cards']['Update'];

export type DatabaseCardSetRow =
  Database['public']['Tables']['card_sets']['Row'];
export type DatabaseCardSetInsert =
  Database['public']['Tables']['card_sets']['Insert'];
export type DatabaseCardSetUpdate =
  Database['public']['Tables']['card_sets']['Update'];

export function toSnakeCaseMap<
  S extends Record<string, any>,
  C extends Record<string, any>
>(snakeCaseObject: S) {
  return Object.fromEntries(
    Object.entries(snakeCaseObject).map(([k, v]) => {
      if (typeof v !== 'object' && typeof v !== 'undefined') {
        return [snakeCase(k), v];
      }
      return [];
    })
  ) as C;
}

export function toCamelCaseMap<
  S extends Record<string, any>,
  C extends Record<string, any>
>(camelCaseObject: S) {
  return Object.fromEntries(
    Object.entries(camelCaseObject).map(([k, v]) => {
      if (typeof v !== 'object' && typeof v !== 'undefined') {
        return [camelCase(k), v];
      }
      return [];
    })
  ) as C;
}

export const transformCardSetOutput = (
  cardSet: DatabaseCardSetRow & { cards?: DatabaseCardRow[] }
): MseCardSet | MseCardSetWithCards => {
  return {
    id: cardSet.id,
    displayName: cardSet.display_name,
    cards: cardSet.cards?.map(transformCardOutput),
    userId: cardSet.user_id,
    slug: cardSet.slug,
    createdAt: cardSet.created_at,
  };
};
export const transformCardOutput = (card: DatabaseCardRow): MseCard => {
  return {
    id: String(card.id),
    name: card.name || '',
    types: card.types || '',
    subtypes: card.subtypes || undefined,
    rulesText: card.rules_text || undefined,
    flavorText: card.flavor_text || undefined,
    manaCost: card.mana_cost || undefined,
    power: card.power || undefined,
    toughness: card.toughness || undefined,
    artworkUrl: card.artwork_url || undefined,
    templateId: card.template_id || 'default',
    cardSetId: card.card_set_id || undefined,
    collectorNumber: card.collector_number || undefined,
    createdAt: card.created_at || undefined,
    userId: card.user_id,
  };
};

export function transformCardInput(
  cardSet: Partial<MseCard>,
  type: 'insert'
): DatabaseCardInsert;
export function transformCardInput(
  cardSet: Partial<MseCard>,
  type: 'update'
): DatabaseCardUpdate;
export function transformCardInput(
  card: Partial<MseCard>,
  type: 'insert' | 'update'
): DatabaseCardInsert | DatabaseCardUpdate {
  if (type === 'insert') {
    return Object.fromEntries(
      Object.entries(card).map(([k, v]) => {
        if (typeof v !== 'object' && typeof v !== 'undefined') {
          return [snakeCase(k), v];
        }
        return [];
      })
    ) as DatabaseCardInsert;
  } else {
    return Object.fromEntries(
      Object.entries(card).map(([k, v]) => {
        if (typeof v !== 'object' && typeof v !== 'undefined') {
          return [snakeCase(k), v];
        }
        return [];
      })
    ) as DatabaseCardUpdate;
  }
}
export function transformCardSetInput(
  cardSet: Partial<MseCardSet>,
  type: 'insert'
): DatabaseCardSetInsert;
export function transformCardSetInput(
  cardSet: Partial<MseCardSet>,
  type: 'update'
): DatabaseCardSetUpdate;
export function transformCardSetInput(
  cardSet: Partial<MseCardSet>,
  type: 'insert' | 'update'
): DatabaseCardSetInsert | DatabaseCardSetUpdate {
  if (type === 'insert') {
    return {
      display_name: cardSet.displayName || '',
      user_id: cardSet.userId || '',
      slug: cardSet.slug,
    } as DatabaseCardSetInsert;
  } else {
    return {
      id: cardSet.id,
      display_name: cardSet.displayName,
      slug: cardSet.slug,
    } as DatabaseCardSetUpdate;
  }
}
