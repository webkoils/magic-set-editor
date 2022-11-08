import { FC } from 'react';
import { useClientStateLoader } from './ClientDataState';

export const ClientStateLoader: FC<{}> = () => {
  useClientStateLoader();
  return <></>;
};
