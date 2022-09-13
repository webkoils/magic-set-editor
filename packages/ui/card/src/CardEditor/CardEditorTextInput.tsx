import { useEffect, useState } from 'react';

export const CardEditorTextInput = ({
  initialValue,
}: {
  initialValue: string;
}) => {
  const [currentTextUnformatted, setCurrentTextUnformatted] = useState(
    initialValue
  );

  useEffect(() => {
    setCurrentTextUnformatted(initialValue || '');
  }, [initialValue]);

  return <></>;
};
