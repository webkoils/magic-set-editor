import { client } from './client';
import type { MseCard, MseCardSet } from '@mse/types';
import { MseCardSetWithCards } from '@mse/types/src/card';
import {
  transformCardInput,
  transformCardOutput,
  transformCardSetInput,
  transformCardSetOutput,
} from './utils';
export const saveCardSet = async (input: Partial<MseCardSet>) => {
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user?.id) {
    throw new TypeError('Not logged in');
  }
  input.userId = user.id;
  const setId =
    input.id && input.id.indexOf('temp_') === -1 ? input.id : undefined;
  if (typeof setId === 'undefined') {
    const insert = transformCardSetInput(input, 'insert');
    const { data, error } = await client
      .from('card_sets')
      .insert(insert)
      .select('*')
      .single();
    if (error) {
      throw error;
    }
    return transformCardSetOutput(data);
  } else {
    const update = transformCardSetInput(input, 'update');
    const { data, error } = await client
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
  const { error } = await client.from('cardSets').delete().eq('id', cardSetId);
  if (error) {
    throw error;
  }
  // delete all cards from that set
  const { error: cardsDeletionError } = await client
    .from('cards')
    .delete()
    .eq('card_set_id', cardSetId);
  if (cardsDeletionError) {
    throw cardsDeletionError;
  }
  return true;
};

export const getCardSetsForUser = async (userId: string) => {
  const { data, error } = await client
    .from('card_sets')
    .select()
    .eq('user_id', userId);

  if (error) {
    throw error;
  }
  return data.map(transformCardSetOutput);
};

export const getCardSet = async (
  cardSetId: string
): Promise<MseCardSetWithCards> => {
  const { data, error } = await client
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
    return { ...cardSet, cards: cards.map(transformCardOutput) };
  }
  return { ...cardSet, cards: [] };
};

export const getCardsInSet = async (cardSetId: string) => {
  const { data, error } = await client
    .from('cards')
    .select()
    .eq('card_set_id', cardSetId);
  if (error) {
    throw error;
  }
  return data.map(transformCardOutput);
};

export const getCard = async (cardId: string) => {
  const { data, error } = await client
    .from('cards')
    .select()
    .eq('id', cardId)
    .single();
  if (error) {
    throw error;
  }
  return transformCardOutput(data);
};

export const saveCard = async (input: Partial<MseCard>) => {
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user?.id) {
    throw new TypeError('Not logged in');
  }
  input.userId = user.id;
  const cardId =
    input.id && input.id.indexOf('temp_') !== 0 ? input.id : undefined;
  if (typeof cardId === 'undefined') {
    const insert = transformCardInput(input, 'insert');
    const { data, error } = await client
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
    const { data, error } = await client
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
  const { error } = await client.from('cards').delete().eq('id', cardId);
  if (error) {
    throw error;
  }
  return true;
};

export {};
