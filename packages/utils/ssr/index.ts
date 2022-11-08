import { useMemo, useEffect, useState } from 'react';

export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};

export const useIsServer = () => {
  return useMemo(
    () => typeof window !== 'undefined' && !!window?.document?.documentElement,
    []
  );
};
