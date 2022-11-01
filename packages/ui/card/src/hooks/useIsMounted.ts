import { useEffect, useState } from 'react';

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log('Mounted');
    setIsMounted(true);
  }, []);
  return isMounted;
};
