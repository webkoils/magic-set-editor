import { ClientState } from './ClientDataState';

const KEY = '@mse_client_state';

export const loadCachedState = (): ClientState | null => {
  if (typeof window !== 'undefined') {
    const cachedData = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (cachedData) {
      return cachedData as ClientState;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
export const clearCachedState = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(KEY);
  }
};
export const saveStateToCache = (newState: ClientState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEY, JSON.stringify(newState));
  }
};
