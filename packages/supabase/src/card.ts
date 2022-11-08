import { supabase } from './client';
import type { MseCard, MseCardSet, Database } from '@mse/types';
import { MseCardSetWithCards } from '../../types/src/card';
export { Database };
export type DatabaseCardRow = Database['public']['Tables']['cards']['Row'];
export type DatabaseCardInsert = Database['public']['Tables']['cards']['Insert'];
export type DatabaseCardUpdate = Database['public']['Tables']['cards']['Update'];

export type DatabaseCardSetRow = Database['public']['Tables']['card_sets']['Row'];
export type DatabaseCardSetInsert = Database['public']['Tables']['card_sets']['Insert'];
export type DatabaseCardSetUpdate = Database['public']['Tables']['card_sets']['Update'];

export const transformCardSetOutput = (
  cardSet: DatabaseCardSetRow & { cards?: DatabaseCardRow[] }
): MseCardSet | MseCardSetWithCards => {
  return {
    id: cardSet.id,
    displayName: cardSet.id,
    cards: cardSet.cards?.map(transformCardOutput),
    userId: cardSet.user_id,
    slug: cardSet.slug,
    createdAt: cardSet.created_at,
  };
};
export const transformCardOutput = (card: DatabaseCardRow): MseCard => {
  return {
    id: card.id,
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
    return {
      name: card.name,
      types: card.types,
      subtypes: card.subtypes,
      rules_text: card.rulesText,
      flavor_text: card.flavorText,
      mana_cost: card.manaCost,
      power: card.power,
      toughness: card.toughness,
      artwork_url: card.artworkUrl,
      template_id: card.templateId || 'default',
      card_set_id: card.cardSetId,
      collector_number: card.collectorNumber,
      user_id: card.userId || '',
    } as DatabaseCardInsert;
  } else {
    return {
      id: card.id,
      name: card.name,
      types: card.types,
      subtypes: card.subtypes,
      rules_text: card.rulesText,
      flavor_text: card.flavorText,
      mana_cost: card.manaCost,
      power: card.power,
      toughness: card.toughness,
      artwork_url: card.artworkUrl,
      template_id: card.templateId,
      card_set_id: card.cardSetId,
      collector_number: card.collectorNumber,
    } as DatabaseCardUpdate;
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

export const saveCardSet = async (input: Partial<MseCardSet>) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    throw new TypeError('Not logged in');
  }
  input.userId = user.id;
  const setId =
    input.id && input.id.indexOf('temp_') !== 0 ? input.id : undefined;
  if (typeof setId === 'undefined') {
    const insert = transformCardSetInput(input, 'insert');
    const { data, error } = await supabase
      .from('card_sets')
      .insert(insert)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return transformCardSetOutput(data);
  } else {
    const update = transformCardSetInput(input, 'update');
    const { data, error } = await supabase
      .from('card_sets')
      .update(update)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return transformCardSetOutput(data);
  }
};

export const deleteCardSet = async (cardSetId: string) => {
  const { error } = await supabase
    .from('cardSets')
    .delete()
    .eq('id', cardSetId);
  if (error) {
    throw error;
  }
  //delete all cards from that set
  const { error: cardsDeletionError } = await supabase
    .from('cards')
    .delete()
    .eq('card_set_id', cardSetId);
  if (cardsDeletionError) {
    throw cardsDeletionError;
  }
  return true;
};

export const getCardSetsForUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('card_sets')
    .select()
    .eq('userId', userId);

  if (error) {
    throw error;
  }
  return data.map(transformCardSetOutput);
};

export const getCardSet = async (cardSetId: string) => {
  const { data, error } = await supabase
    .from('card_sets')
    .select(
      `
    *,
    cards (
     *
    )
  `
    )
    .eq('id', cardSetId)
    .single();

  if (error) {
    throw error;
  }
  const { cards, ...setData } = data;
  const cardSet: MseCardSetWithCards = transformCardSetOutput(setData);

  if (Array.isArray(cards)) {
    return { cardSet, cards: cards.map(transformCardOutput) };
  }
  return { cardSet, cards: undefined };
};

export const getCardsInSet = async (cardSetId: string) => {
  const { data, error } = await supabase
    .from('cards')
    .select()
    .eq('card_set_id', cardSetId);
  if (error) {
    throw error;
  }
  return data.map(transformCardOutput);
};

export const saveCard = async (input: Partial<MseCard>) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    throw new TypeError('Not logged in');
  }
  input.userId = user.id;
  const cardId =
    input.id && input.id.indexOf('temp_') !== 0 ? input.id : undefined;
  if (typeof cardId === 'undefined') {
    const insert = transformCardInput(input, 'insert');
    const { data, error } = await supabase
      .from('cards')
      .insert(insert)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return transformCardOutput(data);
  } else {
    const update = transformCardInput(input, 'update');
    const { data, error } = await supabase
      .from('cards')
      .update(update)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return transformCardOutput(data);
  }
};

export const deleteCard = async (cardId: number) => {
  const { error } = await supabase.from('cards').delete().eq('id', cardId);
  if (error) {
    throw error;
  }
  return true;
};

export {};
